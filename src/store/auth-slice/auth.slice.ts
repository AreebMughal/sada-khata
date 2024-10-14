import { ILogin, ISignUp } from '@/interfaces/auth.interfaces';
import { IApiPayload, IApiResponse, IReduxInitialState } from '@/interfaces/redux-slice.interfaces';
import Cookies from 'js-cookie';
import { execCallbacks } from '@/utils/slice-callbacks';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './auth.service';

const initialState: IReduxInitialState = {
  error: null,
  status: 'idle',
  user: null
};

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signupUser',
  async ({ payload, ...cbFuns }: IApiPayload<ISignUp>, thunkAPI) => {
    try {
      const response: IApiResponse = await authService.signup(payload);
      execCallbacks(response, cbFuns);

      return response.succeeded ? response.data : thunkAPI.rejectWithValue(response);
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/loginUser',
  async ({ payload, ...cbFuns }: IApiPayload<ILogin>, thunkAPI) => {
    try {
      const response: IApiResponse = await authService.login(payload);
      execCallbacks(response, cbFuns);

      if (response.succeeded) {
        Cookies.set('user', response.data.token);
        return response.data;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Signup cases
      .addCase(signup.pending, state => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Login cases
      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;
