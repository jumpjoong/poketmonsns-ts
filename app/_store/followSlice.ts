import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowingType } from "../_types/userType";
import { FollowState } from "../_types/postsType";

export const fetchFollow = createAsyncThunk(
  "follow/ferchFollow",
  async (userId: number) => {
    const response = await fetch(`/api/follow?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { userFollowing } = data;
    return userFollowing;
  }
);

interface LocalFollowState {
  following: FollowingType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const localFollowinitialState: LocalFollowState = {
  following: [],
  status: "idle",
  error: null,
};
//로컬에서 관리하는 팔로우 로직
const localFollowSlice = createSlice({
  name: "follow",
  initialState: localFollowinitialState,
  reducers: {
    localUnfollow: (state, action: PayloadAction<{ followingId: number }>) => {
      state.following = state.following.filter(
        follow => follow.following_id !== action.payload.followingId
      );
    },
    updateLocalFollow: (state, action: PayloadAction<FollowingType[]>) => {
      state.following = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFollow.fulfilled, (state, action) => {
      state.following = action.payload;
      state.status = "succeeded";
    });
  },
});

const followInitialState: FollowState = {
  userFollowing: [],
  status: "idle",
  error: null,
};
//서버에서 받는 팔로우 목록
const serverFollowSlice = createSlice({
  name: "serverFollow",
  initialState: followInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFollow.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchFollow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userFollowing = action.payload;
      })
      .addCase(fetchFollow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const localFollowReducer = localFollowSlice.reducer;
export const serverFollowReducer = serverFollowSlice.reducer;

export const { updateLocalFollow, localUnfollow } = localFollowSlice.actions;
