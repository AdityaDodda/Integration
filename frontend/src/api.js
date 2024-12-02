// src/api.js
import axios from 'axios';

// Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;