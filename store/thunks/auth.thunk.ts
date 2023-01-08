import { createAsyncThunk } from "@reduxjs/toolkit";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
} from "next-auth/react";

export const getProvidersThunk = createAsyncThunk(
  "auth/getProviders",
  async (noParams: undefined, { rejectWithValue }): Promise<any> => {
    try {
      const providers = await getProviders();
      return providers as Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
      >;
    } catch (ex) {
      rejectWithValue("Error getting auth providers");
    }
  }
);
