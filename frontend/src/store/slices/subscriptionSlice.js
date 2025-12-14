import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subscriptionService } from '@/services/subscriptionService';

export const subscribeToPlan = createAsyncThunk(
  'subscriptions/subscribe',
  async (planId, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.subscribeToPlan(planId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Subscription failed');
    }
  }
);

export const fetchUserSubscriptions = createAsyncThunk(
  'subscriptions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.getUserSubscriptions();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch subscriptions');
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'subscriptions/cancel',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      await subscriptionService.cancelSubscription(subscriptionId);
      return subscriptionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to cancel subscription');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload.subscription);
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchUserSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscriptions = state.subscriptions.filter(
          s => s._id !== action.payload
        );
      });
  },
});

export const { clearError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;