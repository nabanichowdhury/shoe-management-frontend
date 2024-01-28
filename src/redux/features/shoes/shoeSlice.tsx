
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoes: [], 
  filters: {
    quantity:null,
    price: null,
    size: null,
    color: null,
    brand: null,
  },
};

const shoeSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    setQuantityFilter: (state, action) => {
        state.filters.quantity = action.payload;
      },
    setPriceFilter: (state, action) => {
      state.filters.price = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.filters.size = action.payload;
    },
    setColorFilter: (state, action) => {
      state.filters.color = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload;
    },
  },
});

export const {
  setPriceFilter,
  setSizeFilter,
  setColorFilter,
  setBrandFilter,
  setQuantityFilter
} = shoeSlice.actions;

export default shoeSlice.reducer;
