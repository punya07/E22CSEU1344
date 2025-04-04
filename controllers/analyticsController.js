// // controllers/analyticsController.js
// const analyticsService = require('../services/analyticsService');

// exports.getTopUsers = async (req, res) => {
//     const token = req.headers.authorization;
  
//     if (!token) {
//       return res.status(401).json({ error: 'Authorization token is required' });
//     }
  
//     try {
//       const users = await analyticsService.fetchTopUsers(token);
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Error fetching top users:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
// exports.getPosts = async (req, res) => {
//   const { type } = req.query;
//   if (!['popular', 'latest'].includes(type)) {
//     return res.status(400).json({ error: 'Query param "type" must be either "popular" or "latest"' });
//   }

//   try {
//     const posts = await analyticsService.fetchPosts(type);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getPostComments = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const comments = await analyticsService.fetchComments(postId);
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(`Error fetching comments for post ${postId}:`, error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
