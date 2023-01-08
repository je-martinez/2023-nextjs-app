import { NextAuthProviders } from "@/types/global";
import { RejectedThunkResult } from "@/types/toolkit";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";
import { getProvidersThunk } from "@/store/thunks/auth.thunk";
export interface AuthState {
  loadingInitialSession: boolean;
  loadingGetProviders: boolean;
  errorGetProviders: string | null | undefined;
  session: Session | undefined | null;
  providers: NextAuthProviders | null;
}

const initialState: AuthState = {
  loadingInitialSession: false,
  loadingGetProviders: false,
  errorGetProviders: null,
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
    clearSession: (state: AuthState) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state: AuthState, action: any) => {
      return { ...state, ...action.payload.auth };
    });
    /* -------------------------------------------------------------------------- */
    /*                              getProvidersThunk                             */
    /* -------------------------------------------------------------------------- */
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
        action: PayloadAction<NextAuthProviders | undefined>
      ) => {
        return {
          ...state,
          loadingGetProviders: false,
          providers: action.payload!,
        };
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

export const { setLoadingInitialSession, setSession, clearSession } =
  authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
