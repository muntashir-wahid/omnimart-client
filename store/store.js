import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./features/currentUser/currentUser";

export const store = configureStore({
  reducer: {
    currentUser: currentUser,
  },
});
