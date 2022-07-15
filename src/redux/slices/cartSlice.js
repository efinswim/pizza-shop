import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const ids = state.items.map((item) => item.id);
      if (ids.indexOf(action.payload.id) === -1) {
        state.items.push(action.payload);
      } else {
        const findItem = state.items.find((item) => action.payload.id === item.id);
        findItem.counter++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.counter;
      }, 0);
    },
    removeItem(state, action) {
      const findItem = state.items.find((item) => action.payload === item.id);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice -= findItem.price * findItem.counter;
    },
    plusItem(state, action) {
      const findItem = state.items.find((item) => action.payload === item.id);
      findItem.counter++;
      state.totalPrice += findItem.price;
    },
    minusItem(state, action) {
      const findItem = state.items.find((item) => action.payload === item.id);
      findItem.counter--;
      state.totalPrice -= findItem.price;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export const cartItems = (state) => state.cart.items;
export const cartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
