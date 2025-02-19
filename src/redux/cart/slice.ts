import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemProps } from '../../components/CartItem';
import { calculateTotalPrice } from '../../utils/calcTotalPrice';
import getItemsFromLS from '../../utils/getItemsFromLS';
import { CartSliceState } from './types';

const initialState: CartSliceState = getItemsFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    clickMinus(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      if (window.confirm('Вы уверены, что хотите удалить эту пиццу?')) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, clickMinus } =
  cartSlice.actions;

export default cartSlice.reducer;
