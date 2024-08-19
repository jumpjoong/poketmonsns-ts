import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsState } from "../_types/postsType";

export const fetchPosts = createAsyncThunk("posts/ferchPosts", async () => {
  const response = await fetch(`/api/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const { allPosts } = data;
  return allPosts;
});

const initialState: PostsState = {
  posts: [],
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
