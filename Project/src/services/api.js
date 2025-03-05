import axios from 'axios';

const API_BASE_URL = 'https://canteenxpress-server.onrender.com'; // Updated backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Register new user (POST /users)
  register: async (userData) => {
    return api.post('/users', userData);
  },

  // Simulated login (GET /users?email=...)
  login: async (credentials) => {
    const response = await api.get(`/users?email=${credentials.email}`);
    
    if (response.data.length === 0) {
      throw new Error('User not found');
    }

    const user = response.data[0];

    // Simulating password check (since JSON Server does not hash passwords)
    if (user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    // Simulating token storage (JSON Server does not issue tokens)
    localStorage.setItem('token', JSON.stringify(user));

    return user;
  },

  // Simulated logout
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve(); // Simulating API call
  }
};


// Menu services
export const menuService = {
  getAllItems: () => api.get('/menu/items'),
  getItemsByCategory: (category) => api.get(`/menu/items/category/${category}`),
  addItem: (item) => api.post('/menu/items', item),
  updateItem: (id, item) => api.put(`/menu/items/${id}`, item),
  deleteItem: (id) => api.delete(`/menu/items/${id}`)
};

// Order services
export const orderService = {
  createOrder: (order) => api.post('/orders', order),
  getUserOrders: () => api.get('/orders/user'),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  getOrderDetails: (id) => api.get(`/orders/${id}`)
};

export default api;
