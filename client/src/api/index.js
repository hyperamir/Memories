import axios from 'axios';

const URL = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(URL);

export const createPost = (newPost) => axios.post(URL, newPost);

export const updatePost = (id, updatedpost) => axios.patch(`${URL}/${id}`, updatedpost );

export const deletePost = (id) => axios.delete(`${URL}/${id}`);