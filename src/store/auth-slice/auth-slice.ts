import { InitialState } from '@/interfaces/initial-state.interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: InitialState = {
  error: null,
  status: 'idle',
  user: null
}

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: any) => {
    // Simulate API call
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: any) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      credentials.email === storedUser.email &&
      credentials.password === storedUser.password
    ) {
      return storedUser;
    } else {
      throw new Error('Invalid email or password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
