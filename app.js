// // app.js
// const express = require('express');
// const app = express();
// const analyticsRoutes = require('./routes/analyticsRoutes');

// app.use(express.json());
// app.use('/', analyticsRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const BASE_URL = 'http://20.244.56.144/evaluation-service';

app.use(express.json());

// ✅ Get Top 5 Users by Number of Posts
app.get('/users', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required in header' });
  }

  try {
    // 1. Fetch Users
    const userRes = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: token }
    });

    const users = userRes.data.users; // { "1": "John", "2": "Alice", ... }
    const postCounts = [];

    // 2. Count Posts per User
    for (const [id, name] of Object.entries(users)) {
      try {
        const postRes = await axios.get(`${BASE_URL}/users/${id}/posts`, {
          headers: { Authorization: token }
        });
        const count = postRes.data.posts?.length || 0;
        postCounts.push({ name, postCount: count });
      } catch (err) {
        console.error(`Error fetching posts for user ${id}:`, err.message);
      }
    }

    // 3. Sort & Return Top 5
    const topUsers = postCounts
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    res.json(topUsers);
  } catch (err) {
    console.error(' Error fetching top users:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Get Latest or Popular Posts
app.get('/posts', async (req, res) => {
  const token = req.headers.authorization;
  const { type } = req.query;

  if (!token) return res.status(401).json({ error: 'Authorization token required' });
  if (!['latest', 'popular'].includes(type))
    return res.status(400).json({ error: 'Query param "type" must be latest or popular' });

  try {
    // 1. Get Users
    const userRes = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: token }
    });
    const users = userRes.data.users;

    // 2. Get All Posts
    let allPosts = [];
    for (const userId of Object.keys(users)) {
      const postRes = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
        headers: { Authorization: token }
      });
      allPosts.push(...(postRes.data.posts || []));
    }

    if (type === 'latest') {
      const latest = allPosts.sort((a, b) => b.id - a.id).slice(0, 5);
      return res.json(latest);
    }

    // 3. For Popular: Attach comment count
    const postsWithComments = await Promise.all(
      allPosts.map(async (post) => {
        const commentRes = await axios.get(`${BASE_URL}/posts/${post.id}/comments`, {
          headers: { Authorization: token }
        });
        return {
          ...post,
          commentCount: commentRes.data.comments?.length || 0,
        };
      })
    );

    const maxComments = Math.max(...postsWithComments.map(p => p.commentCount));
    const popular = postsWithComments.filter(p => p.commentCount === maxComments);

    res.json(popular);
  } catch (err) {
    console.error(' Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Get Comments for a Post
app.get('/posts/:postId/comments', async (req, res) => {
  const token = req.headers.authorization;
  const { postId } = req.params;

  if (!token) return res.status(401).json({ error: 'Authorization token required' });

  try {
    const commentRes = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
      headers: { Authorization: token }
    });
    res.json(commentRes.data.comments || []);
  } catch (err) {
    console.error(`Error fetching comments for post ${postId}:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
