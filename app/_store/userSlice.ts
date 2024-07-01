import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";
import { UserState } from "../_types/userType";

//유저 정보 가져오기
export const fetchUser = createAsyncThunk(
  "user/fetchUserData",
  async ({ userId, accessToken }: { userId: number; accessToken: string }) => {
    const response = await fetch(`/api/getuserdata?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    const data = await response.json();
    if (response.status === 404) {
      //accessToken값 없이 user data get요청 시 에러
      throw new Error("데이터 가져오기 실패");
    } else if (response.status === 401 || data === null) {
      //토큰 시간 만료 시 로그아웃
      signOut();
    }
    return data;
  }
);

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
