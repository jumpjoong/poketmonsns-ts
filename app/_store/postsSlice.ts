import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsState } from "../_types/postsType";

export const fetchPosts = createAsyncThunk("posts/ferchPosts", async () => {
  const response = await fetch("/api/getposts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

const initialState: PostsState = {
  posts: null,
  status: "idle",
  error: null,
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
