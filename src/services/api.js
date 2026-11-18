/**
 * ==============================================================================
 * 🌐 TC SPORT REST API CLIENT (SPRING BOOT BACKEND BRIDGE)
 * ==============================================================================
 * Cầu nối giao tiếp giữa React Frontend và Spring Boot Backend (http://localhost:8081).
 * Hỗ trợ tự động gắn JWT Token Bearer vào Header cho các yêu cầu xác thực.
 * ==============================================================================
 */

const API_BASE_URL = import.meta.env?.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ? '' : 'http://localhost:8081');

function getAuthHeader() {
  try {
    const raw = localStorage.getItem('tc_auth_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.token) {
        return { Authorization: `Bearer ${parsed.token}` };
      }
    }
  } catch (e) {}
  return {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const errData = await response.text();
      if (errData) errorMsg = errData;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  // Nếu response không có content (204 No Content hoặc DELETE thành công)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
}

export const api = {
  // -------------------------------------------------------------
  // 1. AUTHENTICATION & PROFILE
  // -------------------------------------------------------------
  auth: {
    login: (email, password) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }),

    register: (userData) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      }),

    googleSync: (googleUserData) =>
      request('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleUserData)
      }),

    updateProfile: (profileData) =>
      request('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      })
  },

  // -------------------------------------------------------------
  // 2. PRODUCTS & INVENTORY
  // -------------------------------------------------------------
  products: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.brand && params.brand !== 'all') searchParams.set('brand', params.brand);
      if (params.category && params.category !== 'all') searchParams.set('category', params.category);
      if (params.search) searchParams.set('search', params.search);

      const qs = searchParams.toString();
      return request(`/api/products${qs ? `?${qs}` : ''}`);
    },

    getById: (id) => request(`/api/products/${id}`),

    create: (productData) =>
      request('/api/products', {
        method: 'POST',
        body: JSON.stringify(productData)
      }),

    update: (id, productData) =>
      request(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
      }),

    delete: (id) =>
      request(`/api/products/${id}`, {
        method: 'DELETE'
      }),

    restock: (id, qty = 10) =>
      request(`/api/products/${id}/restock?qty=${qty}`, {
        method: 'POST'
      })
  },

  // -------------------------------------------------------------
  // 3. CATEGORIES & BRANDS
  // -------------------------------------------------------------
  categories: {
    getAll: () => request('/api/categories'),
    create: (data) => request('/api/categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/api/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/api/categories/${id}`, { method: 'DELETE' })
  },

  brands: {
    getAll: () => request('/api/brands'),
    create: (data) => request('/api/brands', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/api/brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/api/brands/${id}`, { method: 'DELETE' })
  },

  // -------------------------------------------------------------
  // 4. ORDERS & LOGISTICS
  // -------------------------------------------------------------
  orders: {
    create: (orderData) =>
      request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      }),

    getAll: () => request('/api/orders'),

    getByCode: (orderCode) => request(`/api/orders/track/${orderCode}`),

    getByPhone: (phone) => request(`/api/orders/user/${phone}`),

    updateStatus: (id, status) =>
      request(`/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      }),

    updateShipping: (id, shippingData) =>
      request(`/api/orders/${id}/shipping`, {
        method: 'PUT',
        body: JSON.stringify(shippingData)
      })
  },

  // -------------------------------------------------------------
  // 5. ANALYTICS & REVENUE
  // -------------------------------------------------------------
  analytics: {
    getOverview: () => request('/api/analytics/overview'),

    getRevenue: (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.startDate) searchParams.set('startDate', params.startDate);
      if (params.endDate) searchParams.set('endDate', params.endDate);
      const qs = searchParams.toString();
      return request(`/api/analytics/revenue${qs ? `?${qs}` : ''}`);
    },

    getDailyDetail: (date) =>
      request(`/api/analytics/daily-detail?date=${encodeURIComponent(date)}`)
  },

  // -------------------------------------------------------------
  // 6. IMAGE FILE UPLOAD
  // -------------------------------------------------------------
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
      ...getAuthHeader()
    };

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Tải ảnh thất bại!');
    }
    return await response.json();
  },

  // -------------------------------------------------------------
  // 7. GEMINI AI ASSISTANT CHATBOT
  // -------------------------------------------------------------
  ai: {
    chat: (message, history = []) =>
      request('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history })
      }),
    getStatus: () => request('/api/ai/status')
  }
};

export default api;
