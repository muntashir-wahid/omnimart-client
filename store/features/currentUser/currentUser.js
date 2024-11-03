import APIKit from "@/lib/apiKit";
import httpClient from "@/lib/httpClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "fetch/currentUser",
  async (thunkAPI) => {
    const data = await APIKit.users.getMe();

    return data.data.user;
  }
);

export const counterSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setCurrentUser, removeUser } = counterSlice.actions;

export default counterSlice.reducer;
