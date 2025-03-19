import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './features/checkout/cartSlice';
import { authSlice } from '@/lib/features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      auth: authSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
