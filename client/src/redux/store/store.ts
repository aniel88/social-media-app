import { configureStore } from "@reduxjs/toolkit";
import { registerSlice } from "../reducers/register/registerSlice";

export interface RegisterResponse {
  register: {
    status: string;
  };
}
const store: any = configureStore({
  reducer: {
    register: registerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
