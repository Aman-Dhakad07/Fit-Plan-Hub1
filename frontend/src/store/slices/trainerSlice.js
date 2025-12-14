import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trainerService } from '@/services/trainerService';

export const fetchAllTrainers = createAsyncThunk(
  'trainers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getAllTrainers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch trainers');
    }
  }
);

export const fetchTrainerProfile = createAsyncThunk(
  'trainers/fetchProfile',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await trainerService.getTrainerProfile(trainerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch trainer');
    }
  }
);

export const followTrainer = createAsyncThunk(
  'trainers/follow',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await trainerService.followTrainer(trainerId);
      return { trainerId, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to follow trainer');
    }
  }
);

export const fetchFollowedTrainers = createAsyncThunk(
  'trainers/fetchFollowed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getFollowedTrainers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch followed trainers');
    }
  }
);

export const fetchPersonalizedFeed = createAsyncThunk(
  'trainers/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainerService.getPersonalizedFeed();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch feed');
    }
  }
);

const trainerSlice = createSlice({
  name: 'trainers',
  initialState: {
    trainers: [],
    currentTrainer: null,
    followedTrainers: [],
    feed: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTrainer: (state) => {
      state.currentTrainer = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrainers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(fetchAllTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrainerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTrainer = action.payload;
      })
      .addCase(fetchTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(followTrainer.fulfilled, (state, action) => {
        if (state.currentTrainer && state.currentTrainer._id === action.payload.trainerId) {
          state.currentTrainer.isFollowing = action.payload.isFollowing;
        }
      })
      .addCase(fetchFollowedTrainers.fulfilled, (state, action) => {
        state.followedTrainers = action.payload;
      })
      .addCase(fetchPersonalizedFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPersonalizedFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fetchPersonalizedFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTrainer, clearError } = trainerSlice.actions;
export default trainerSlice.reducer;