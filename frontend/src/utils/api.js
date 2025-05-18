import axios from 'axios';

const API = axios.create({
  baseURL: 'https://boom-project.vercel.app',
});

export default API;
