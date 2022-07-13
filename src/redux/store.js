import { configureStore } from '@reduxjs/toolkit';
import { filters } from './slices/filterSlice';
import filterReducer from './slices/filterSlice'

import cart from './slices/cartSlice'

export const store = configureStore({
  reducer: { 
    filters: filterReducer,
    cart
  },
});
