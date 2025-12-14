import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { planService } from '@/services/planService';

export const fetchAllPlans = createAsyncThunk(
  'plans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await planService.getAllPlans();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch plans');
    }
  }
);

export const fetchPlan = createAsyncThunk(
  'plans/fetchOne',
  async (planId, { rejectWithValue }) => {
    try {
      const response = await planService.getPlan(planId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch plan');
    }
  }
);

export const createPlan = createAsyncThunk(
  'plans/create',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await planService.createPlan(planData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create plan');
    }
  }
);

export const updatePlan = createAsyncThunk(
  'plans/update',
  async ({ planId, planData }, { rejectWithValue }) => {
    try {
      const response = await planService.updatePlan(planId, planData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update plan');
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plans/delete',
  async (planId, { rejectWithValue }) => {
    try {
      await planService.deletePlan(planId);
      return planId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete plan');
    }
  }
);

export const fetchMyPlans = createAsyncThunk(
  'plans/fetchMyPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await planService.getMyPlans();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch plans');
    }
  }
);

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    myPlans: [],
    currentPlan: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
        state.myPlans.push(action.payload);
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
        const myIndex = state.myPlans.findIndex(p => p._id === action.payload._id);
        if (myIndex !== -1) {
          state.myPlans[myIndex] = action.payload;
        }
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(p => p._id !== action.payload);
        state.myPlans = state.myPlans.filter(p => p._id !== action.payload);
      })
      .addCase(fetchMyPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.myPlans = action.payload;
      })
      .addCase(fetchMyPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentPlan, clearError } = planSlice.actions;
export default planSlice.reducer;