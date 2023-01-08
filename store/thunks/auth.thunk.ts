import { NextAuthProviders } from "@/types/global";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProviders } from "next-auth/react";

export const getProvidersThunk = createAsyncThunk(
  "auth/getProviders",
  async (none: undefined, { rejectWithValue }) => {
    try {
      const providers = await getProviders();
      return providers as NextAuthProviders;
    } catch (ex) {
      return rejectWithValue("Error getting auth providers");
    }
  }
);
