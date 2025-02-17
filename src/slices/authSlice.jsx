import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCartSuccess } from "./CartSlice";
import { fetchDishes } from "./DishSlice";
import { fetchCounters } from "./CounterSlice";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
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
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
    dispatch(fetchDishes());
    dispatch(fetchCounters());
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
  dispatch(clearCartSuccess());
};

export default authSlice.reducer;
