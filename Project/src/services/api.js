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
  register: async (userData) => api.post('/users', userData),

  login: async (credentials) => {
    const response = await api.get(`/users?email=${credentials.email}`);
    
    if (response.data.length === 0) throw new Error('User not found');

    const user = response.data[0];

    if (user.password !== credentials.password) throw new Error('Invalid credentials');

    localStorage.setItem('token', JSON.stringify(user)); // Simulating session storage

    return user;
  },

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve(); // Simulating API call
  }
};

// Menu services (Updated for JSON Server)
export const menuService = {
  getAllItems: () => api.get('/menu'), // Changed from `/menu/items`
  getItemsByCategory: (category) => api.get(`/menu?category=${category}`), // Changed for JSON Server
  addItem: (item) => api.post('/menu', item),
  updateItem: (id, item) => api.put(`/menu/${id}`, item),
  deleteItem: (id) => api.delete(`/menu/${id}`)
};

// Order services (Updated for JSON Server)
export const orderService = {
  createOrder: (order) => api.post('/orders', order),
  getUserOrders: (userId) => api.get(`/orders?userId=${userId}`), // Changed for JSON Server
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}`, { status }), // Changed PUT to PATCH
  getOrderDetails: (id) => api.get(`/orders/${id}`)
};

export default api;
