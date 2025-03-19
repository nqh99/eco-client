import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginResponse } from '@/models/auth/LoginResponse';
import { CustomerMdl } from '@/models/users/customer';

export type AuthState = {
  isAuthenticated: boolean;
  customer: CustomerMdl | null;
  accessTokenExpiry: string | null;
  refreshTokenExpiry: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  customer: null,
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = true;
      state.accessTokenExpiry = action.payload.accessTokenExpiry;
      state.refreshTokenExpiry = action.payload.refreshTokenExpiry;
    },
    principal: (state, action: PayloadAction<CustomerMdl>) => {
      state.customer = action.payload;
    },
    unauthenticate: (state) => {
      state.isAuthenticated = false;
      state.accessTokenExpiry = null;
      state.refreshTokenExpiry = null;
      state.customer = null;
    },
  },
});
