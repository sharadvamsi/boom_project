import axios from 'axios';

const API = axios.create({
  baseURL: 'https://boom-project.onrender.com',
});

export default API;
