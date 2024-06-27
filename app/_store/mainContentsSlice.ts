import { createSlice } from "@reduxjs/toolkit";

const mainContentsSlice = createSlice({
  name: "mainContents",
  initialState: "",
  reducers: {
    selectsPost: () => "POSTS",
    selectsTrend: () => "TREND",
    selectsEncyclopedia: () => "ENCYCLOPEDIA",
    selectsMyPosts: () => "MYPOSTS",
    selectsWrite: () => "WRITE",
  },
});

export default mainContentsSlice.reducer;
export const {
  selectsPost,
  selectsTrend,
  selectsEncyclopedia,
  selectsMyPosts,
  selectsWrite,
} = mainContentsSlice.actions;
