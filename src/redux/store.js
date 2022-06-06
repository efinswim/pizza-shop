import { configureStore } from '@reduxjs/toolkit';
import { filters } from './slices/filterSlice';
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: { filters: filterReducer },
});
