import { createSlice } from '@reduxjs/toolkit';

const showLoginModalSlice = createSlice({
  name: 'showLoginModal',
  initialState: false,
  reducers: {
    SHOW_MODAL: () => {
      return true;
    },
    HIDE_MODAL: () => {
      return false;
    },
  },
});

export const {
  SHOW_MODAL,
  HIDE_MODAL,
} = showLoginModalSlice.actions;

export default showLoginModalSlice.reducer;
