import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";
export interface AuthState {
  loadingInitialSession: boolean;
  session: Session | undefined | null;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const initialState: AuthState = {
  loadingInitialSession: false,
  session: null,
  providers: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingInitialSession: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.loadingInitialSession = action.payload;
    },
    setSession: (
      state: AuthState,
      action: PayloadAction<Session | undefined>
    ) => {
      state.session = action.payload;
    },
    setProviders: (
      state: AuthState,
      action: PayloadAction<
        Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
      >
    ) => {
      state.providers = action.payload;
    },
    clearSession: (state: AuthState) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state: AuthState, action: any) => {
      return { ...state, ...action.payload.auth };
    });
  },
});

export const {
  setLoadingInitialSession,
  setSession,
  setProviders,
  clearSession,
} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
