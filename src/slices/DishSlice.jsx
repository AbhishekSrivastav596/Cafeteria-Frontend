import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from 'reselect';


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
    addDishSuccess:(state,action) => {
      state.loading = false;
      const newDish = action.payload;
      state.dishes = state.dishes.map((dish) =>
        dish._id === newDish._id ? newDish : dish
      );
    },
  },
});

const getCartItems = (state) => state.cart.cartItems;

export const selectCartDishId = createSelector(
  [getCartItems],
  (cartItems) => cartItems.map(item => item.dish._id)
);



export const {
  fetchDishesRequest,
  fetchDishesSuccess,
  fetchDishesFailure,
  addToCartSuccess,
  addDishSuccess,
  editDishSuccess,
} = dishSlice.actions;

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.get('http://localhost:8080/dishes');
    console.log(response.data);  
    dispatch(fetchDishesSuccess(response.data.dishes));
  } catch (error) {
    dispatch(fetchDishesFailure(error.message));
  }
};

export const fetchDishByCounter = (counterId) => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try{
    const response = await axios.get(`http://localhost:8080/dishes/counter/${counterId}`);
    console.log(response.data);
    dispatch(fetchDishesSuccess(response.data.dishes));
  }catch(err){
    dispatch(fetchDishesFailure(err.message));
  }
}


export const editDishes = (dishId, updatedDishData) => async (dispatch) => {
  dispatch(fetchDishesRequest());
  try {
    const response = await axios.patch(`http://localhost:8080/dishes/${dishId}`,updatedDishData);
    console.log('Dish updated successfully:', response.data);
    dispatch(editDishSuccess(response.data.updatedDish));
  } catch (error) {
    console.error('Failed to edit dish:', error.message);
    dispatch(fetchDishesFailure(error.message));
  }
};

export const addNewDish = (newDish) => async(dispatch) => {
  dispatch(fetchDishesRequest());
  try{
    const response = await axios.post('http://localhost:8080/dishes/',newDish);
    dispatch(addDishSuccess(response.data.newDish));
  }catch(err){
    console.log('Error adding new dish:',err.message);
    dispatch(fetchDishesFailure(err.message));
  }
}


export default dishSlice.reducer;
