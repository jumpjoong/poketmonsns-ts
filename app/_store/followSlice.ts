import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowingType } from "../_types/userType";

interface FollowState {
  following: FollowingType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const localFollowinitialState: FollowState = {
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
    setInitialLocalFollowing: (
      state,
      action: PayloadAction<FollowingType[]>
    ) => {
      state.following = action.payload;
      state.status = "succeeded";
    },
  },
});

export default localFollowSlice.reducer;
export const localFollowReducer = localFollowSlice.reducer;
export const { updateLocalFollow, localUnfollow, setInitialLocalFollowing } =
  localFollowSlice.actions;
