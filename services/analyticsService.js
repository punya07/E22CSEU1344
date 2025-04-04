// // services/analyticsService.js
// const apiClient = require('../models/apiClient');

// // ✅ Fetch top 5 users by number of posts
// exports.fetchTopUsers = async () => {
//   try {
//     const users = await apiClient.getUsers();
//     const postCountMap = new Map();

//     for (const [id, name] of Object.entries(users)) {
//       try {
//         const posts = await apiClient.getUserPosts(id);
//         postCountMap.set(name, posts.length);
//         console.log(`User ${name} (ID: ${id}) has ${posts.length} posts`);
//       } catch (postErr) {
//         console.error(`Error getting posts for user ${id}:`, postErr.message);
//       }
//     }

//     const sortedUsers = Array.from(postCountMap.entries())
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([name, count]) => ({ name, postCount: count }));

//     console.log(" Top Users:", sortedUsers);
//     return sortedUsers;

//   } catch (error) {
//     console.error(' Error in fetchTopUsers:', error.message);
//     throw error;
//   }
// };

// // ✅ Fetch latest or popular posts
// exports.fetchPosts = async (type) => {
//   try {
//     const users = await apiClient.getUsers();
//     let allPosts = [];

//     for (const userId of Object.keys(users)) {
//       const posts = await apiClient.getUserPosts(userId);
//       allPosts.push(...posts);
//     }

//     if (type === 'latest') {
//       const latestPosts = allPosts
//         .sort((a, b) => b.id - a.id)
//         .slice(0, 5);

//       console.log(" Latest Posts:", latestPosts);
//       return latestPosts;
//     }

//     if (type === 'popular') {
//       const postsWithComments = await Promise.all(
//         allPosts.map(async (post) => {
//           const comments = await apiClient.getPostComments(post.id);
//           return {
//             ...post,
//             commentCount: comments.length,
//           };
//         })
//       );

//       const maxComment = Math.max(...postsWithComments.map(p => p.commentCount));
//       const popularPosts = postsWithComments.filter(post => post.commentCount === maxComment);

//       console.log(" Popular Posts:", popularPosts);
//       return popularPosts;
//     }

//     return [];

//   } catch (error) {
//     console.error(' Error in fetchPosts:', error.message);
//     throw error;
//   }
// };

// // ✅ Fetch comments for a given post
// exports.fetchComments = async (postId) => {
//   try {
//     const comments = await apiClient.getPostComments(postId);
//     console.log(` Comments for post ${postId}:`, comments.length);
//     return comments;
//   } catch (error) {
//     console.error(` Error in fetchComments(${postId}):`, error.message);
//     throw error;
//   }
// };
