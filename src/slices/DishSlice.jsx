import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dishes: [],
  cartItems: [],
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
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    },
    editDishSuccess: (state, action) => {
      state.loading = false;
      const updatedDish = action.payload;
      state.dishes = state.dishes.map((dish) =>
        dish._id === updatedDish._id ? updatedDish : dish
      );
    },
    editDishFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDishesRequest,
  fetchDishesSuccess,
  fetchDishesFailure,
  addToCartSuccess,
  editDishSuccess,
  editDishFailure,
} = dishSlice.actions;

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.get('http://localhost:8080/dishes');
    dispatch(fetchDishesSuccess(response.data));
  } catch (error) {
    dispatch(fetchDishesFailure(error.message));
  }
};

export const addDishes = (dishId, quantity) => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.post('http://localhost:8080/cart/add', {
      dishId,
      quantity,
    });
    console.log(response.data);
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    console.error(error.message);
    dispatch(fetchDishesFailure(error.message));
  }
};

export const editDishes = (dishId, updatedDishData) => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.patch(`http://localhost:8080/dishes/${dishId}`,updatedDishData);
    console.log('Dish updated successfully:', response.data);
    dispatch(editDishSuccess(response.data));
  } catch (error) {
    console.error('Failed to edit dish:', error.message);
    dispatch(editDishFailure(error.message));
  }
};

export default dishSlice.reducer;
