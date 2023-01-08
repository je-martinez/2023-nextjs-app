import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

// Type for our state
export interface AuthState {
  authState: boolean;
}

// Initial state
const initialState: AuthState = {
  authState: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state: AuthState, action: PayloadAction<boolean>) {
      state.authState = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: AuthState, action: PayloadAction<any>) => {
      state = { ...action.payload.auth };
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
