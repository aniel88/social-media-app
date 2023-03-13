// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { IPostProps } from "../../../components/Post/Post";
// import { User } from "../../../models/user";

// const namespace = "post";

// interface IInitialData {
//   isLoading: boolean;
//   postData: Array<IPostProps>;
// }

// const initialState: IInitialData = {
//   postData: [],
//   isLoading: false,
// };

// export interface AddPostType {
//   image: any;
//   description: string | Blob;
//   currentToken: string;
//   firstName: string;
//   lastName: string;
//   userId: number;
// }

// export interface DeletePostType {
//   postId: number;
// }

// /* Async Thunck Function  */
// export const deletePost = createAsyncThunk(
//   `${namespace}`,
//   async ({ postId }: DeletePostType, { rejectWithValue }) => {
//     try {
//       await axios.delete(
//         `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/${postId}`
//       );
//       return postId;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteSlice = createSlice({
//   name: namespace,
//   initialState,
//   reducers: {
//     setPostData(state, action) {
//       state.postData = [...state.postData, ...action.payload.postData];
//     },
//   },
//   extraReducers: {
//     [deletePost.pending.toString()]: (state) => {
//       state.isLoading = true;
//     },
//     [deletePost.fulfilled.toString()]: (state, action) => {
//       state.isLoading = false;
//       state.postData = state.postData.filter(
//         (post) => post.id !== action.payload
//       );
//     },
//     [deletePost.rejected.toString()]: (state, action) => {
//       state.isLoading = false;
//       console.log(action.payload);
//     },
//   },
// });

// export const { setPostData } = postSlice.actions;
// export default postSlice.reducer;
