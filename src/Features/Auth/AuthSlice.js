import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "./AuthAPI";

const initialState = {
  Status: 'idle', // corrected typo
  Loginfo: "",
  Islog: false,
  error: '', // Add error state
};

export const LoginAsync = createAsyncThunk(
  'auth/login',
  async (userdata) => {
    const response = await Login(userdata);
    return response.data;
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.Status = 'pending';
      })
      .addCase(LoginAsync.fulfilled, (state, actions) => {
        state.Status = 'idle';
        state.Loginfo = actions.payload;
        state.Islog = true;
      })
      .addCase(LoginAsync.rejected, (state, action) => {  // Handle errors here
        state.Status = 'idle';
        state.error = action.error.message;  // Store the error message
        state.Islog = false;
      });
  },
});

export const LoginedInfo = (state) => state.Auth.Loginfo;
export const islogged = (state) => state.Auth.Islog;
export const loginError = (state) => state.Auth.error; // Add selector for error

export default AuthSlice.reducer;
