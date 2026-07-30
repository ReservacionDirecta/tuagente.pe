import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tuagente.pe';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const propertiesApi = {
  getAll: (params) => api.get('/properties', { params }),
  getById: (id) => api.get(`/properties/${id}`),
  getByCategory: (category) => api.get(`/properties/category/${category}`),
  search: (query) => api.get(`/properties/search`, { params: { q: query } }),
};

export const contactApi = {
  send: (data) => api.post('/contact', data),
  subscribeNewsletter: (email) => api.post('/newsletter/subscribe', { email }),
};

export const agentsApi = {
  getAll: () => api.get('/agents'),
  getById: (id) => api.get(`/agents/${id}`),
};

export const blogApi = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
};

export default api;
