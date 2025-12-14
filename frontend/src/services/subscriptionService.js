import api from './api';

export const subscriptionService = {
  subscribeToPlan: async (planId) => {
    const response = await api.post(`/subscriptions/${planId}`);
    return response.data;
  },

  getUserSubscriptions: async () => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  cancelSubscription: async (subscriptionId) => {
    const response = await api.put(`/subscriptions/${subscriptionId}/cancel`);
    return response.data;
  },
};