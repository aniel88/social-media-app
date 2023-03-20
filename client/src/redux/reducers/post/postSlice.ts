/* Async thunk */
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

/* Axios */
import axios from "axios";

/* Component */
import { IPostProps } from "../../../components/Post/Post";

const namespace = "post";

interface IInitialData {
  isLoading: boolean;
  postData: Array<IPostProps>;
}

const initialState: IInitialData = {
  postData: [],
  isLoading: false,
};

const types = ["add", "delete"] as const;
type ActionType = typeof types[number];

export interface PostActionType {
  type: ActionType;
  postId?: number;
  image?: any;
  description?: string | Blob;
  currentToken?: string;
  firstName?: string;
  lastName?: string;
  userId?: number;
}

/* Async Thunck Function  */
export const postAction = createAsyncThunk(
  `${namespace}`,
  async (
    {
      type,
      postId,
      image,
      description,
      currentToken,
      firstName,
      lastName,
      userId,
    }: PostActionType,
    { rejectWithValue }
  ) => {
    try {
      if (type === "delete") {
        await axios.delete(
          `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/${postId}`
        );
        return { type: "delete", postId };
      } else {
        const formData = new FormData();
        formData.append("postImage", image[0]);
        formData.append("description", description!);

        const addedPostId = await axios.post(
          `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/add`,
          formData,
          {
            headers: {
              "x-access-token": currentToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          type: "post",
          postId: addedPostId,
          image,
          description,
          firstName,
          lastName,
          userId,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setPostData(state, action) {
      state.postData = [...state.postData, ...action.payload.postData];
    },
  },
  extraReducers: {
    [postAction.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [postAction.fulfilled.toString()]: (state, action) => {
      if (action.payload.type === "post") {
        const addedPost: IPostProps = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          id: action.payload.postId.data,
          userId: action.payload.userId,
          createdAt: "just now",
          likes: 0,
          comments: 0,
          liked: "no",
          desc: action.payload.description,
          img: action.payload.image[0]
            ? URL.createObjectURL(action.payload.image[0])
            : "",
        };
        state.postData = [addedPost, ...state.postData];
      } else {
        state.postData = state.postData.filter(
          (post) => post.id !== action.payload.postId
        );
      }
      state.isLoading = false;
    },
    [postAction.rejected.toString()]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;
