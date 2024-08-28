/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    LOGIN_ACTION: (state, action) => {
      return state = { ...action.payload };
    },
    LOGOUT_ACTION: (state) => {
      return state = null;
    },
  },
});

export const {
  LOGIN_ACTION,
  LOGOUT_ACTION,
} = userSlice.actions;

export default userSlice.reducer;
