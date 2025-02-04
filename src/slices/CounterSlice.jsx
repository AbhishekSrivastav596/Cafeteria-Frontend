import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  counters: [],
  merchants: [],  
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
    fetchMerchantsSuccess: (state, action) => {
      state.merchants = action.payload; 
    },
    fetchMerchantsFailure: (state, action) => {
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
    },
    updateCounterSuccess: (state, action) => {
      const updatedCounter = action.payload;
      const index = state.counters.findIndex((counter) => counter._id === updatedCounter._id);
      if (index !== -1) {
        state.counters[index] = updatedCounter;
      }
    },
    createCounterSuccess: (state, action) => {
      state.counters.push(action.payload);
    },
  },
});

export const {
  fetchCountersRequest,
  fetchCountersSuccess,
  fetchCountersFailure,
  fetchMerchantsSuccess,
  fetchMerchantsFailure,
  addMerchantToCounter,
  removeMerchantFromCounter,
  deleteCounter,
  updateCounterSuccess,
  createCounterSuccess,
} = counterSlice.actions;

export const fetchCounters = () => async (dispatch) => {
  dispatch(fetchCountersRequest());
  try {
    const response = await axios.get('http://localhost:8080/counters');
    dispatch(fetchCountersSuccess(response.data));
  } catch (error) {
    dispatch(fetchCountersFailure(error.message));
  }
};

export const fetchMerchants = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/users/merchant'); 
    dispatch(fetchMerchantsSuccess(response.data)); 
    console.log("merchants: ",response.data);
  } catch (err) {
    console.error('Error Fetching merchants', err);
    dispatch(fetchMerchantsFailure(err.message)); 
  }
};

export const createCounter = (counterData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/counters', counterData);
    dispatch(createCounterSuccess(response.data.counter));
  } catch (error) {
    console.error('Error creating counter:', error);
  }
};

export const updateCounter = (counterId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8080/counters/${counterId}`, updatedData);
    dispatch(updateCounterSuccess(response.data.counter)); 
  } catch (error) {
    console.error('Error updating counter:', error);
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
