import { createSlice } from "@reduxjs/toolkit";

const mainContentsSlice = createSlice({
  name: "mainContents",
  initialState: "",
  reducers: {
    selectsBoard: () => "BOARD",
    selectsTrend: () => "TREND",
    selectsEncyclopedia: () => "ENCYCLOPEDIA",
    selectsMyPosts: () => "MYPOSTS",
    selectsWrite: () => "WRITE",
    selectsEditProfile: () => "EDITPROFILE",
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
} = mainContentsSlice.actions;
