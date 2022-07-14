import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: { token: null },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectToken = (state) => state.token.token;
