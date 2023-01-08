import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Session } from "next-auth";
export interface AuthState {
  loadingInitialSession: boolean;
  session: Session | undefined | null;
}

const initialState: AuthState = {
  loadingInitialSession: false,
  session: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingInitialSession(state: AuthState, action: PayloadAction<boolean>) {
      state.loadingInitialSession = action.payload;
    },
    setSessionState(state: AuthState, action: PayloadAction<Session>) {
      state.session = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: AuthState, action: PayloadAction<any>) => {
      state = action.payload.auth;
    },
  },
});

export const { setLoadingInitialSession, setSessionState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
