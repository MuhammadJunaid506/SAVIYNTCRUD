// itemSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveListToLocalStorage } from './localStorageUtils';
import { fetchItemsAsync } from './itemThunks';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    createItem: (state, action) => {
      const newItems = [...state.items, action.payload];
      state.items = newItems;
      saveListToLocalStorage(state.items);
    },
    updateItem: (state, action) => {
      const updatedItem = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
        saveListToLocalStorage(state.items);
      }
    },
    deleteItem: (state, action) => {
      console.log(action.payload)
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveListToLocalStorage(state.items);
    },
    sortItems: (state, action) => {
      const fieldToSortBy = action.payload;

      // Sorting logic
      state.items.sort((a, b) => {
        const valueA = a[fieldToSortBy];
        const valueB = b[fieldToSortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          // If both values are strings, perform a case-insensitive comparison
          return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
        } else {
          // For other types, use a simple comparison
          return valueA - valueB;
        }
      });

      saveListToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        console.log('Fulfilled:', action.payload);
        state.status = 'succeeded';
        state.items = action.payload;
        saveListToLocalStorage(state.items);
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { createItem, updateItem, deleteItem , sortItems} = itemSlice.actions;

export default itemSlice.reducer;
