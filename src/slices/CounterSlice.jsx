import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  counters: [],
  loading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetchCountersRequest: (state) => {
      state.loading = true;
    },
    fetchCountersSuccess: (state, action) => {
      state.loading = false;
      state.counters = action.payload;
    },
    fetchCountersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMerchantToCounter: (state, action) => {
      const { counterId, merchantId } = action.payload;
      const counter = state.counters.find((counter) => counter._id === counterId);
      if (counter && !counter.merchants.includes(merchantId)) {
        counter.merchants.push(merchantId);
      }
    },
    removeMerchantFromCounter: (state, action) => {
      const { counterId, merchantId } = action.payload;
      const counter = state.counters.find((counter) => counter._id === counterId);
      if (counter) {
        counter.merchants = counter.merchants.filter((id) => id !== merchantId);
      }
    },
    deleteCounter: (state, action) => {
      state.counters = state.counters.filter((counter) => counter._id !== action.payload);
    }
  }
});

export const {
  fetchCountersRequest,
  fetchCountersSuccess,
  fetchCountersFailure,
  addMerchantToCounter,
  removeMerchantFromCounter,
  deleteCounter,
} = counterSlice.actions;


export const fetchCounters = () => async (dispatch) => {
  dispatch(fetchCountersRequest());
  try {
    const response = await axios.get('http://localhost:8080/counters');
    dispatch(fetchCountersSuccess(response.data));
    console.log(response.data);
    
  } catch (error) {
    dispatch(fetchCountersFailure(error.message));
  }
};

export const addMerchant = (counterId, merchantId) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8080/counters/${counterId}/merchant/${merchantId}`);
    dispatch(addMerchantToCounter({ counterId, merchantId }));
  } catch (error) {
    console.error('Error adding merchant:', error);
  }
};

export const removeMerchant = (counterId, merchantId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/counters/${counterId}/merchant/${merchantId}`);
    dispatch(removeMerchantFromCounter({ counterId, merchantId }));
  } catch (error) {
    console.error('Error removing merchant:', error);
  }
};

export const deleteCounterAsync = (counterId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/counters/${counterId}`);
    dispatch(deleteCounter(counterId));
  } catch (error) {
    console.error('Error deleting counter:', error);
  }
};


export default counterSlice.reducer;
