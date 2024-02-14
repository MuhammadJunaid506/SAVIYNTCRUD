
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FETCH_ITEMS } from './itemConstants';

export const fetchItemsAsync = createAsyncThunk(FETCH_ITEMS, async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
});
