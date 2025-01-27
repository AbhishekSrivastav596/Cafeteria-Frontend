import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/CounterSlice'
import dishReducer from './slices/DishSlice'
import cartReducer from './slices/CartSlice'


const store = configureStore({
  reducer: {
    counter: counterReducer,
    dish:dishReducer,
    cart:cartReducer
  },
});

export default store;
