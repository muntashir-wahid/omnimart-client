import { configureStore } from "@reduxjs/toolkit";

import cart from "./features/cart/cartSlice";
import currentUser from "./features/currentUser/currentUser";

export const store = configureStore({
  reducer: {
    currentUser: currentUser,
    cart: cart,
  },
});
