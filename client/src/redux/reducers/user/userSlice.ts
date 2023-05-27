import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { IPostProps } from "../../../components/Post/Post";
import { User } from "../../../models/user";
const namespace = "user";

interface IInitialData {
  isLoading: boolean;
  userData: User;
  postData: Array<IPostProps>;
}

export const initialState: IInitialData = {
  isLoading: false,
  userData: {
    email: "",
    firstName: "",
    userName: "",
    iat: 0,
    id: 0,
    isValidate: 0,
    lastName: "",
  },
  postData: [],
};

export interface AddPostType {
  image: any;
  description: string | Blob;
  currentToken: string;
}

export interface DeletePostType {
  postId: number;
}

/* Async Thunck Function  */
export const addPost = createAsyncThunk(
  `${namespace}`,
  async (
    { image, description, currentToken }: AddPostType,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("postImage", image[0]);
      formData.append("description", description);

      const addedPostId = await axios.post(
        `http://${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
            : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
        }:${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
            : process.env.REACT_APP_PRODUCTION_SERVER_PORT
        }/api/posts/add`,
        formData,
        {
          headers: {
            "x-access-token": currentToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log({ postId: addedPostId, image, description });
      return { postId: addedPostId, image, description };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload.userData;
      state.postData = state.postData;
    },
    setPostData(state, action) {
      state.postData = [...state.postData, ...action.payload.postData];
      state.userData = state.userData;
    },
    setUserDataAndPostData(state, action) {
      state.postData = action.payload.postData;
      state.userData = action.payload.userData;
    },
    changeUserProfileImage(state, action) {
      console.log(URL.createObjectURL(action.payload[0]));
      console.log(current(state.userData));
      state.userData.profilePic = URL.createObjectURL(action.payload[0]);
      // state.postData = [...state.postData, ...action.payload.postData];
    },
  },
  extraReducers: {
    [addPost.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [addPost.fulfilled.toString()]: (state, action) => {
      const addedPost: IPostProps = {
        firstName: state.userData.firstName,
        lastName: state.userData.lastName,
        id: action.payload.postId.data,
        userId: state.userData.id,
        createdAt: "just now",
        likes: 0,
        comments: 0,
        liked: "no",
        desc: action.payload.description,
        img: action.payload.image[0]
          ? URL.createObjectURL(action.payload.image[0])
          : "",
      };

      state.isLoading = false;
      state.postData = [addedPost, ...state.postData];
    },
    [addPost.rejected.toString()]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  setUserDataAndPostData,
  setUserData,
  setPostData,
  changeUserProfileImage,
} = userSlice.actions;
export default userSlice.reducer;
