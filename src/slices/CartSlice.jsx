import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],  
  loading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartSuccess: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCartSuccess: (state) => {
      state.cartItems = [];
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { cartSuccess, clearCartSuccess, setCartLoading } = cartSlice.actions;

export const fetchCart = () => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const response = await axios.get("http://localhost:8080/cart");
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
  dispatch(setCartLoading(false));
};

export const removeFromCart = (dishId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:8080/cart/remove`, {
      data: { dishId },
    });
    console.log("data", response.data);
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
};

export const increaseQuantity = (dishId) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:8080/cart/${dishId}`, {
      changeQuantity: 1,
    });
    console.log("Increased quantity Data: ", response.data);
    dispatch(cartSuccess(response.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const decreaseQuantity = (dishId) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:8080/cart/${dishId}`, {
      changeQuantity: -1,
    });
    dispatch(cartSuccess(response.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/cart/clear`, { data: { userId } });
    dispatch(clearCartSuccess());
  } catch (error) {
    console.error(error.message);
  }
};

export const addTocart = (dishId, quantity) => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const response = await axios.post("http://localhost:8080/cart/add", {
      dishId,
      quantity,
    });
    console.log(response.data);
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
  dispatch(setCartLoading(false));

};

export default cartSlice.reducer;
