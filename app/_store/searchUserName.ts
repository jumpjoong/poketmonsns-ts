import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

const searchUserName = createSlice({
  name: "searchUserName",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchUserName.actions;
export default searchUserName.reducer;
