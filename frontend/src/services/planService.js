import api from './api';

export const planService = {
  getAllPlans: async () => {
    const response = await api.get('/plans');
    return response.data;
  },

  getPlan: async (planId) => {
    const response = await api.get(`/plans/${planId}`);
    return response.data;
  },

  createPlan: async (planData) => {
    const response = await api.post('/plans', planData);
    return response.data;
  },

  updatePlan: async (planId, planData) => {
    const response = await api.put(`/plans/${planId}`, planData);
    return response.data;
  },

  deletePlan: async (planId) => {
    const response = await api.delete(`/plans/${planId}`);
    return response.data;
  },

  getMyPlans: async () => {
    const response = await api.get('/plans/my-plans');
    return response.data;
  },
};