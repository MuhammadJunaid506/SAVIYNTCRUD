import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const saveListToLocalStorage = (updatedList) => {
  try {
    localStorage.setItem('itemList', JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

export const getListLocalStorage = () => {
  const savedListJSON = localStorage.getItem('itemList');
  return savedListJSON ? JSON.parse(savedListJSON) : [];
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('https://reqres.in/api/users?page=1');
  return response.data.data;
});

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    createItem: (state, action) => {
      state.items.push(action.payload);
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
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveListToLocalStorage(state.items); 
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
      saveListToLocalStorage(state.items); 
    },
    [fetchItems.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { createItem, updateItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
