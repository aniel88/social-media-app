import { createSlice } from "@reduxjs/toolkit";

/**
 *Create interface for Register State
 *
 * @interface RegisterState
 */
export interface RegisterState {
  status: string;
}

const initialState: RegisterState = {
  status: "unknown",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    success: (state) => {
      state.status = "success";
    },
    pending: (state) => {
      state.status = "pending";
    },
    error: (state) => {
      state.status = "error";
    },
    unknown: (state) => {
      state.status = "unknown";
    },
    warning: (state) => {
      state.status = "warning";
    },
  },
});

export default registerSlice.reducer;

export const { success, pending, error, unknown } = registerSlice.actions;
