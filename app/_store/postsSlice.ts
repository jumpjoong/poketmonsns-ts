import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FollowState, PostsState } from "../_types/postsType";

export const fetchPosts = createAsyncThunk(
  "posts/ferchPosts",
  async (userId: number) => {
    const response = await fetch(`/api/posts?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    //구조 분해 할당
    const { posts, userFollowing } = data;
    return { posts, userFollowing };
  }
);

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
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const followInitialState: FollowState = {
  userFollowing: [],
  status: "idle",
  error: null,
};
const followingSlice = createSlice({
  name: "following",
  initialState: followInitialState,
  reducers: {
    follow: (state, action) => {
      state.userFollowing = action.payload.updatedLocalFollowing;
    },
    unfollow: (state, action) => {
      state.userFollowing = action.payload.updatedLocalFollowing;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userFollowing = action.payload.userFollowing;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default postsSlice.reducer;
export const followingReducer = followingSlice.reducer;
export const { follow, unfollow } = followingSlice.actions;
