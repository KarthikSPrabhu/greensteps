import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (userData) => API.post('/auth/login', userData),
};

export const challengesAPI = {
  getDaily: () => API.get('/challenges/daily'),
  complete: (challengeId) => API.post('/challenges/complete', { challengeId }),
};

export const usersAPI = {
  getProfile: () => API.get('/users/profile'),
  getLeaderboard: () => API.get('/users/leaderboard'),
};

export default API;