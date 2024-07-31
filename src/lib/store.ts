import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/checkout/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      carts: cartSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
