import { createSlice } from "@reduxjs/toolkit";

const mainContentsSlice = createSlice({
  name: "mainContents",
  initialState: "",
  reducers: {
    selectsBoard: () => "Board",
    selectsTrend: () => "Trend",
    selectsEncyclopedia: () => "Encyclopedia",
    selectsMyPosts: () => "MyPost",
    selectsWrite: () => "Write",
    selectsEditProfile: () => "EditProfile",
    selectsFollowing: () => "Following",
    selectsNoob: () => "Noob",
  },
});

export default mainContentsSlice.reducer;
export const {
  selectsBoard,
  selectsTrend,
  selectsEncyclopedia,
  selectsMyPosts,
  selectsWrite,
  selectsEditProfile,
  selectsFollowing,
  selectsNoob,
} = mainContentsSlice.actions;
