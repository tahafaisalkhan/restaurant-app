import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: "",
  status: "",
  items_ordered: [],
  quantity_ordered: [],
  total_price: 0
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem(state, action) {
      const { name, price } = action.payload;
      const itemIndex = state.items_ordered.indexOf(name);
      
      if (itemIndex !== -1) {
        state.quantity_ordered[itemIndex] += 1;
      } else {
        state.items_ordered.push(name);
        state.quantity_ordered.push(1);
      }
      
      state.total_price += price;
    },
    removeItem(state, action) {
      const { name, price } = action.payload;
      const itemIndex = state.items_ordered.indexOf(name);
      
      if (itemIndex !== -1) {
        state.quantity_ordered[itemIndex] -= 1;
        
        if (state.quantity_ordered[itemIndex] <= 0) {
          state.items_ordered.splice(itemIndex, 1);
          state.quantity_ordered.splice(itemIndex, 1);
        }
        
        state.total_price = Math.max(0, state.total_price - price);
      }
    },
    resetState(state) {
      state.items_ordered = [];
      state.quantity_ordered = [];
      state.total_price = 0;
    }
  },
});

export const { addItem, removeItem, resetState } = orderSlice.actions;
export default orderSlice.reducer;
