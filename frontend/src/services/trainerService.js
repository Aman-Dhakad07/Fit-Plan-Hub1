import api from './api';

export const trainerService = {
  getAllTrainers: async () => {
    const response = await api.get('/trainers');
    return response.data;
  },

  getTrainerProfile: async (trainerId) => {
    const response = await api.get(`/trainers/${trainerId}`);
    return response.data;
  },

  followTrainer: async (trainerId) => {
    const response = await api.post(`/trainers/${trainerId}/follow`);
    return response.data;
  },

  getFollowedTrainers: async () => {
    const response = await api.get('/trainers/following');
    return response.data;
  },

  getPersonalizedFeed: async () => {
    const response = await api.get('/trainers/feed');
    return response.data;
  },
};