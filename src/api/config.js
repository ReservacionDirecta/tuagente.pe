const API_BASE = '/api';

const getToken = () => localStorage.getItem('token');

export const api = {
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Error ${res.status}`);
    }
    return res.json();
  },

  post: async (url, body) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  },

  put: async (url, body) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  },

  delete: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  },

  upload: async (url, formData, method = 'POST') => {
    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  },
};
