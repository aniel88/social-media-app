import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginType } from "../../../models/login";

const namespace = "login";

export interface LoginTypeState {
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: LoginTypeState = {
  isLoading: false,
  errorMessage: "",
};

/* Async Thunck Function  */
export const login = createAsyncThunk(
  `${namespace}`,
  async (formInputValues: LoginType, { rejectWithValue }) => {
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
        }/api/auth/login`,
        formInputValues
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
    },
    [login.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.errorMessage = action.payload;
    },
  },
});

export default loginSlice.reducer;
