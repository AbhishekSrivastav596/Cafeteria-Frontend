import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/CounterSlice";
import dishReducer from "./slices/DishSlice";
import cartReducer from "./slices/CartSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    counter: counterReducer,
    dish: dishReducer,
    cart: cartReducer,
  },
});

export default store;
