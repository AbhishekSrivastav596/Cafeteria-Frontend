import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { authRequest, authSuccess, authFailure, logout } =
  authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post("http://localhost:8080/auth/login",credentials);
    console.log(response.data);
    dispatch(
      authSuccess({ user: response.data.user, token: response.data.token })
    );
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Login failed"));
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post("http://localhost:8080/auth/signup",userData);
    dispatch(
      authSuccess({ user: response.data.user, token: response.data.token })
    );
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Signup failed"));
  }
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
