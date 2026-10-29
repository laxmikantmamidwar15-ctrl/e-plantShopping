
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant to the cart
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        item => item.id === newItem.id
      );

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      }
    },

    // Remove a plant from the cart
    removeItem: (state, action) => {
      const itemId = action.payload;

      state.items = state.items.filter(
        item => item.id !== itemId
      );
    },

    // Update the quantity of a plant
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        item => item.id === id
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            item => item.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    }
  }
});

// Export the required action functions
export const {
  addItem,
  removeItem,
  updateQuantity
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
