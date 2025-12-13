import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me')
};

export const productAPI = {
    getAll: (params) => api.get('/products', { params }),
    getOne: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`)
};

export const cartAPI = {
    getCart: () => api.get('/cart'),
    addToCart: (data) => api.post('/cart/add', data),
    updateItem: (itemId, data) => api.put(`/cart/item/${itemId}`, data),
    removeItem: (itemId) => api.delete(`/cart/item/${itemId}`),
    clearCart: () => api.delete('/cart/clear')
};

export const orderAPI = {
    create: (data) => api.post('/orders', data),
    getMyOrders: () => api.get('/orders'),
    getOne: (id) => api.get(`/orders/${id}`),
    cancel: (id) => api.post(`/orders/${id}/cancel`)
};

export default api;
