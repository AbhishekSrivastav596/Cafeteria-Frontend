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
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get('https://cafeteria-backend-0m45.onrender.com/counters', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchCountersSuccess(response.data));
  } catch (error) {
    dispatch(fetchCountersFailure(error.message));
  }
};

export const fetchMerchants = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get('https://cafeteria-backend-0m45.onrender.com/users/merchant',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    dispatch(fetchMerchantsSuccess(response.data)); 
    console.log("merchants: ",response.data);
  } catch (err) {
    console.error('Error Fetching merchants', err);
    dispatch(fetchMerchantsFailure(err.message)); 
  }
};

export const createCounter = (counterData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post('https://cafeteria-backend-0m45.onrender.com/counters', counterData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createCounterSuccess(response.data.counter));
  } catch (error) {
    console.error('Error creating counter:', error);
  }
};

export const updateCounter = (counterId, updatedData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.put(`https://cafeteria-backend-0m45.onrender.com/counters/${counterId}`, updatedData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateCounterSuccess(response.data.counter)); 
  } catch (error) {
    console.error('Error updating counter:', error);
  }
};

export const addMerchant = (counterId, merchantId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.put(`https://cafeteria-backend-0m45.onrender.com/counters/${counterId}/merchant/${merchantId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addMerchantToCounter({ counterId, merchantId })); 
  } catch (error) {
    console.error('Error adding merchant:', error);
  }
};

export const removeMerchant = (counterId, merchantId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`https://cafeteria-backend-0m45.onrender.com/counters/${counterId}/merchant/${merchantId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeMerchantFromCounter({ counterId, merchantId })); 
  } catch (error) {
    console.error('Error removing merchant:', error);
  }
};

export const deleteCounterAsync = (counterId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`https://cafeteria-backend-0m45.onrender.com/counters/${counterId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteCounter(counterId));
  } catch (error) {
    console.error('Error deleting counter:', error);
  }
};

export default counterSlice.reducer;
