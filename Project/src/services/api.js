import axios from 'axios';

const API_BASE_URL = 'https://canteenxpress-server.onrender.com'; // Updated backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Auth services (Modified for JSON Server)
export const authService = {
  },

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve(); // Simulating API call
  }
};

// Menu services (Updated for JSON Server)
export const menuService = {

};

// Order services (Updated for JSON Server)
export const orderService = {
  
};

export default api;
