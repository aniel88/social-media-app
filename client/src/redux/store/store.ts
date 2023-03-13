import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { loginSlice } from "../reducers/login/loginSlice";
import { postSlice } from "../reducers/post/postSlice";
import { registerSlice } from "../reducers/register/registerSlice";
import { userSlice } from "../reducers/user/userSlice";

export interface RegisterResponse {
  register: {
    status: string;
  };
}
const store: any = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
