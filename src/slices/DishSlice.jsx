import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dishes: [],
  loading: false,
  error: null,
};

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    fetchDishesRequest: (state) => {
      state.loading = true;
    },
    fetchDishesSuccess: (state, action) => {
      state.loading = false;
      state.dishes = action.payload;
    },
    fetchDishesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDishesRequest, fetchDishesSuccess, fetchDishesFailure } = dishSlice.actions;

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.get('http://localhost:8080/dishes');
    dispatch(fetchDishesSuccess(response.data));
  } catch (error) {
    dispatch(fetchDishesFailure(error.message));
  }
};

export default dishSlice.reducer;
