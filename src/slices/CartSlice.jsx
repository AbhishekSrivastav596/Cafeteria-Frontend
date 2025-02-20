import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
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

export const { cartSuccess, clearCartSuccess, setCartLoading } =
  cartSlice.actions;

export const fetchCart = () => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get("https://cafeteria-backend-0m45.onrender.com/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
  dispatch(setCartLoading(false));
};

export const removeFromCart = (dishId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.delete(
      `https://cafeteria-backend-0m45.onrender.com/cart/remove/${dishId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", response.data);
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
};

export const increaseQuantity = (dishId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.patch(
      `https://cafeteria-backend-0m45.onrender.com/cart/${dishId}`,
      { changeQuantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Increased quantity Data: ", response.data);
    dispatch(cartSuccess(response.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const decreaseQuantity = (dishId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.patch(
      `https://cafeteria-backend-0m45.onrender.com/cart/${dishId}`,
      { changeQuantity: -1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(cartSuccess(response.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(
      `https://cafeteria-backend-0m45.onrender.com/cart/clear/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(clearCartSuccess());
  } catch (error) {
    console.error(error.message);
  }
};

export const addTocart = (dishId, quantity) => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      "https://cafeteria-backend-0m45.onrender.com/cart/add",
      { dishId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    console.error(error.message);
  }
  dispatch(setCartLoading(false));
};

export default cartSlice.reducer;
