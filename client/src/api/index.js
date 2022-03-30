import axios from 'axios';

const URL = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(URL);