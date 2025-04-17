import axios from 'axios';

const getBaseURL = () => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    // return isLocalhost ? 'http://localhost:3001' : 'https://b85e-102-212-236-175.ngrok-free.app';
    return isLocalhost ? 'https://b85e-102-212-236-175.ngrok-free.app' : 'https://b85e-102-212-236-175.ngrok-free.app';
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', 
  },
});

export default axiosInstance;