import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIKit from "@/lib/apiKit";

const initialState = {
  cart: null,
};

export const fetchCart = createAsyncThunk("fetch/cart", async () => {
  const data = await APIKit.cart.getCart();

  return data.data.cart;
});

export const mutateCart = createAsyncThunk("mutate/cart", async (data) => {
  await APIKit.cart.addProductToCart(data);
});

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCart: (state) => {
      state.cart = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });

    builder.addCase(mutateCart.fulfilled, (state, action) => {
      state.cart.CartItems.push({ uid: 1 });
    });
  },
});

export const { removeCart } = counterSlice.actions;

export default counterSlice.reducer;
