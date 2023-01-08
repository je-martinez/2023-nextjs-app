import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";
import { getProvidersThunk } from "../thunks/auth.thunk";
export interface AuthState {
  loadingInitialSession: boolean;
  loadingGetProviders: boolean;
  errorGetProviders: string | null | undefined;
  session: Session | undefined | null;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const initialState: AuthState = {
  loadingInitialSession: false,
  errorGetProviders: null,
  loadingGetProviders: false,
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
    builder.addCase(getProvidersThunk.pending, (state: AuthState) => {
      return {
        ...state,
        loadingGetProviders: true,
        errorGetProviders: null,
      };
    });
    builder.addCase(
      getProvidersThunk.fulfilled,
      (
        state: AuthState,
        action: PayloadAction<
          | Record<
              LiteralUnion<BuiltInProviderType, string>,
              ClientSafeProvider
            >
          | undefined
        >
      ) => {
        console.log("Ab");
        return { ...state, providers: action.payload! };
      }
    );
    builder.addCase(
      getProvidersThunk.rejected,
      (state: AuthState, action: PayloadAction<RejectedThunkResult>) => {
        return {
          ...state,
          loadingGetProviders: false,
          errorGetProviders: action.payload as string,
        };
      }
    );
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
