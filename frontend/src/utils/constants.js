export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CATEGORIES = [
  'Weight Loss',
  'Muscle Gain',
  'Flexibility',
  'Cardio',
  'Strength',
  'General Fitness'
];

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/sessions if you use them
});

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
