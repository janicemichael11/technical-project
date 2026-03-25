// src/services/api.js
// Central Axios instance for all backend communication.
// Vite's proxy (vite.config.js) forwards /api → http://localhost:5000
// so we never hardcode the backend URL in component code.

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000, // 15s — platform fetches can be slow
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach JWT if the user is logged in ─────────────────
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

// ── Response interceptor — unwrap the { success, data, meta } envelope ────────
// Every backend response looks like: { success, message, data, meta? }
// We unwrap it here so callers just get { data, meta, message } directly.
api.interceptors.response.use(
  (response) => response, // pass through — callers destructure res.data
  (error) => {
    // Normalise error message from backend envelope or Axios default
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// ── Product endpoints ─────────────────────────────────────────────────────────

export const productService = {
  /**
   * Search products across all platforms.
   * GET /api/products/search?q=query&sort=price_asc&platform=Amazon,eBay
   */
  search: (query, { sort = 'price_asc', platform = '' } = {}) => {
    const params = { q: query };
    if (sort)     params.sort     = sort;
    if (platform) params.platform = platform;
    return api.get('/products/search', { params });
  },

  /**
   * Compare prices by pasting a product URL.
   * POST /api/products/compare-link
   * Body: { url: "https://amazon.com/..." }
   */
  compareLink: (url) => api.post('/products/compare-link', { url }),

  /**
   * Fetch a single product by its MongoDB _id.
   * GET /api/products/:id
   */
  getById: (id) => api.get(`/products/${id}`),

  /**
   * Fetch trending searches (last 24h).
   * GET /api/products/trending
   */
  getTrending: () => api.get('/products/trending'),
};

// ── Auth endpoints ────────────────────────────────────────────────────────────

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login',    data),
  getMe:    ()     => api.get('/auth/me'),
};

// ── User endpoints ────────────────────────────────────────────────────────────

export const userService = {
  getProfile:    ()     => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// ── History endpoints (requires auth) ────────────────────────────────────────

export const historyService = {
  getHistory:   () => api.get('/history'),
  clearHistory: () => api.delete('/history'),
};

// ── Health check ──────────────────────────────────────────────────────────────

export const healthService = {
  check: () => api.get('/health'),
};

export default api;
