// // models/apiClient.js
// const axios = require('axios');

// const BASE_URL = 'http://20.244.56.144/evaluation-service';

// // const HEADERS = {
// //     headers: {
// //       Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ3MzM3LCJpYXQiOjE3NDM3NDcwMzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjExZDFjNDRjLTU5MzUtNGY0NS05NWQyLWM4OTE1MjM3N2E4NCIsInN1YiI6ImUyMmNzZXUxMzQ0QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTEzNDRAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoicHVueWEgZGl4aXQiLCJyb2xsTm8iOiJlMjJjc2V1MTM0NCIsImFjY2Vzc0NvZGUiOiJydENIWkoiLCJjbGllbnRJRCI6IjExZDFjNDRjLTU5MzUtNGY0NS05NWQyLWM4OTE1MjM3N2E4NCIsImNsaWVudFNlY3JldCI6IkJ5VlhrUkJUcnJQemtDVEoifQ.k5IT5VHY1abI5EuxQtVKfnvfaDZ_yNwwc8tN7-GgF3U'  // <-- full token
// //     }
// //   };


// // ✅ Get all users
// exports.getUsers = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/users`);

//     if (res.status !== 200 || !res.data || !res.data.users) {
//       console.error('Unexpected response from /users:', res.data);
//       throw new Error('Invalid response from user API');
//     }

//     console.log("getUsers success:", Object.keys(res.data.users).length, "users fetched.");
//     return res.data.users;

//   } catch (err) {
//     console.error(' Error in getUsers:', err.message);
//     throw new Error('Failed to fetch users');
//   }
// };

// // ✅ Get all posts for a user
// exports.getUserPosts = async (userId) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/users/${userId}/posts`);
//     return res.data.posts || [];
//   } catch (err) {
//     console.error(` Error fetching posts for user ${userId}:`, err.message);
//     return [];
//   }
// };

// // ✅ Get all comments for a post
// exports.getPostComments = async (postId) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
//     return res.data.comments || [];
//   } catch (err) {
//     console.error(` Error fetching comments for post ${postId}:`, err.message);
//     return [];
//   }
// };
