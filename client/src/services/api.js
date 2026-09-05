import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export async function getCrafts(params = {}) {
  try {
    const res = await api.get('/crafts', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching crafts:', error);
    throw error;
  }
}

export async function getFilterMeta() {
  try {
    const res = await api.get('/crafts/meta/filters');
    return res.data;
  } catch (error) {
    console.error('Error fetching filter metadata:', error);
    throw error;
  }
}

export async function getCraftById(id) {
  try {
    const res = await api.get(`/crafts/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching craft ${id}:`, error);
    throw error;
  }
}

export async function submitResearchedCraft(craftData) {
  try {
    const res = await api.post('/crafts', craftData);
    return res.data;
  } catch (error) {
    console.error('Error submitting researched craft:', error);
    throw error;
  }
}

export async function getCraftInsights(id) {
  try {
    const res = await api.get(`/crafts/${id}/insights`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching AI insights for ${id}:`, error);
    throw error;
  }
}

export async function getOrders(email) {
  try {
    const res = await api.get('/orders', { params: { email } });
    return res.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function getOrderTracking(id) {
  try {
    const res = await api.get(`/orders/${id}/tracking`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching tracking for ${id}:`, error);
    throw error;
  }
}

export async function createOrder(orderData) {
  try {
    const res = await api.post('/orders/create', orderData);
    return res.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function requestReturn(orderId, returnReason) {
  try {
    const res = await api.post(`/orders/${orderId}/return`, { returnReason });
    return res.data;
  } catch (error) {
    console.error(`Error requesting return for ${orderId}:`, error);
    throw error;
  }
}

export async function submitReview(reviewData) {
  try {
    const res = await api.post('/reviews', reviewData);
    return res.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
}

export async function getSellers(params = {}) {
  try {
    const res = await api.get('/sellers', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching sellers:', error);
    throw error;
  }
}

export async function registerSeller(formData) {
  try {
    const res = await api.post('/sellers/register', formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error registering seller:', error);
    throw error;
  }
}

export async function verifySeller(id, status, badge) {
  try {
    const res = await api.put(`/sellers/${id}/verify`, { status, badge });
    return res.data;
  } catch (error) {
    console.error(`Error verifying seller ${id}:`, error);
    throw error;
  }
}

export async function searchAI(q) {
  try {
    const res = await api.get('/ai/search', { params: { q } });
    return res.data;
  } catch (error) {
    console.error('Error with AI search:', error);
    throw error;
  }
}

export async function analyzeAITagging(payload) {
  try {
    const res = await api.post('/ai/tag', payload);
    return res.data;
  } catch (error) {
    console.error('Error with AI tagging:', error);
    throw error;
  }
}

export default api;
