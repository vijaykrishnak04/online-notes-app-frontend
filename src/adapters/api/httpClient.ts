// src/adapters/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your API base URL
});

httpClient.interceptors.request.use((config) => {
  // Assuming you store your token in local storage.
  // Replace with your token retrieval logic if different.
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;
