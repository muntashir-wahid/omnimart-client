import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIKit from "@/lib/apiKit";
import { calcDiscountPrice } from "@/lib/utils";

const initialState = {
  cart: [],
};

export const fetchCart = createAsyncThunk("fetch/cart", async () => {
  const data = await APIKit.cart.getCart();
  const cartInstance = data.data.cart;

  let cart;

  // Manipulate data when cart has no product
  if (!cartInstance || cartInstance.CartItems.length === 0) {
    cart = [];
  }

  if (cartInstance.CartItems.length > 0) {
    cart = cartInstance.CartItems.map((cartItem) => {
      const {
        uid: cartItemUid,
        quantity,
        product: {
          uid: productUid,
          discount,
          price,
          baseProduct: { name },
          ProductConfigs,
        },
      } = cartItem;

      return {
        cartItemUid,
        productUid,
        productName: name,
        quantity,
        price: +price,
        discount,
        discountPrice: calcDiscountPrice(price, discount),
        ProductConfigs,
      };
    });
  }

  return cart;
});

export const addProductToCart = createAsyncThunk(
  "addProductToCart",
  async (data) => {
    const { data: cartData } = await APIKit.cart.addProductToCart(data);

    const {
      uid: cartItemUid,
      quantity,
      product: {
        uid: productUid,
        discount,
        price,
        baseProduct: { name },
        ProductConfigs,
      },
    } = cartData.cart;

    return {
      cartItemUid,
      productUid,
      productName: name,
      quantity,
      price: +price,
      discount,
      discountPrice: calcDiscountPrice(price, discount),
      ProductConfigs,
    };
  }
);

export const mutateCartQuantity = createAsyncThunk(
  "mutateCartQuantity",
  async (data) => {
    const { data: cartData } = await APIKit.cart.addProductToCart(data);

    if (!cartData.cart) {
      return {
        removeProduct: true,
        productUid: data.productUid,
      };
    }

    const {
      uid: cartItemUid,
      quantity,
      product: {
        uid: productUid,
        discount,
        price,
        baseProduct: { name },
        ProductConfigs,
      },
    } = cartData.cart;

    return {
      cartItemUid,
      productUid,
      productName: name,
      quantity,
      price: +price,
      discount,
      discountPrice: calcDiscountPrice(price, discount),
      ProductConfigs,
    };
  }
);

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

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cart.push(action.payload);
    });

    builder.addCase(mutateCartQuantity.fulfilled, (state, action) => {
      if (action.payload.removeProduct) {
        state.cart = state.cart.filter(
          (item) => item.productUid !== action.payload.productUid
        );

        return;
      }

      const matchItemIndex = state.cart.findIndex(
        (item) => item.productUid === action.payload.productUid
      );

      state.cart[matchItemIndex] = action.payload;
    });
  },
});

export const { removeCart } = counterSlice.actions;

export default counterSlice.reducer;
