/* Redux */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Axios */
import axios from "axios";

/* Models */
import { RegisterType } from "../../../models/register";

interface RegisterTypeState {
  isLoading: boolean;
}

/* Initial state */
const initialState: RegisterTypeState = {
  isLoading: false,
};

const namespace = "register";

/* Async Thunk Function */
export const createAccount = createAsyncThunk(
  `${namespace}/createAccount`,
  async (formInputValues: RegisterType) => {
    try {
      const response = await axios.post(
        `http://${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
            : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
        }:${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
            : process.env.REACT_APP_PRODUCTION_SERVER_PORT
        }/api/auth/register`,
        formInputValues
      );
      const { successToken } = response.data;
      return successToken;
    } catch (error) {
      console.log(error);
    }
  }
);
export const registerSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [createAccount.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [createAccount.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
    },
    [createAccount.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { toggleLoading } = registerSlice.actions;
export default registerSlice.reducer;
