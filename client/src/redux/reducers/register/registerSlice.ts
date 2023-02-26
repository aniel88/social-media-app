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
        `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/auth/register`,
        formInputValues
      );
      console.log(response.data);
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
