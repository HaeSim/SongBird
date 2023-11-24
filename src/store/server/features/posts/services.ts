import axios from 'axios';

import type { ParamsAddPost } from '../../../../types/interfaces/post';

const getPost = async (id: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
};
const getPosts = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
};

const addPost = async (body: ParamsAddPost) => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export { addPost, getPost, getPosts };
