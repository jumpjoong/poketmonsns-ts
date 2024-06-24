import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    name: "",
    pro_img: "",
  },
  reducers: {},
});

export default userSlice.actions;
// export const 리듀서함수 = userSlice.actions
