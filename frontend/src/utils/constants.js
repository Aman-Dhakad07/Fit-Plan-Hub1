export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CATEGORIES = [
  'Weight Loss',
  'Muscle Gain',
  'Flexibility',
  'Cardio',
  'Strength',
  'General Fitness'
];

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PLANS: '/plans',
  TRAINERS: '/trainers',
  DASHBOARD: '/dashboard',
  FEED: '/feed',
  SUBSCRIPTIONS: '/subscriptions',
};
