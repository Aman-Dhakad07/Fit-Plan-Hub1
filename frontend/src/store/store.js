import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import planReducer from './slices/planSlice';
import trainerReducer from './slices/trainerSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    trainers: trainerReducer,
    subscriptions: subscriptionReducer,
  },
});
