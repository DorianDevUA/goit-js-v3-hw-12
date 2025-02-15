// import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] =
//   '43520057-d4110ce2722b475a1deefaa82';

// console.log(axios.defaults);
// // console.log(axios.defaults.baseURL);

// export default class JsonServerApiServise {
//   constructor() {}

//   fetchPosts() {
//     return axios.get('/posts').then(resp => resp.data);
//     // return fetch(`${BASE_URL}${endpoint}`).then(response => {
//     //   if (!response.ok) {
//     //     throw new Error(response.status);
//     //   }

//     //   return response.json();
//     // });
//   }

//   createPost(newPost) {
//     const endpoint = 'posts';
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newPost),
//     };

//     return fetch(`${BASE_URL}${endpoint}`, options).then(resp => resp.json());
//   }

//   updatePost(postId, data) {
//     const endpoint = 'posts';
//     const options = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     };

//     return fetch(`${BASE_URL}${endpoint}/${postId}`, options).then(resp =>
//       resp.json()
//     );
//   }

//   deletePost(postId) {
//     const endpoint = 'posts';
//     const url = `${BASE_URL}${endpoint}/${postId}`;
//     const options = {
//       method: 'DELETE',
//     };

//     return fetch(url, options).then(resp => resp.json());
//   }
// }
