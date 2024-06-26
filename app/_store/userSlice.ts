import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  pro_img: string;
  name: string;
  email: string;
  credit: number;
  rep: number;
  badge_list: number[];
}
//유저 정보 가져오기
export const fetchUser = createAsyncThunk(
  "user/fetchUserData",
  async ({ userId, accessToken }: { userId: string; accessToken: string }) => {
    const response = await fetch(
      `http://localhost:3000/api/getuserdata?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("데이터 가져오기 실패");
    }
    return data;
  }
);
interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

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
