import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainContentsState {
  current: string;
  history: string[];
}

const initialState: MainContentsState = {
  current: "",
  history: [],
};

const mainContentsSlice = createSlice({
  name: "mainContents",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      if (state.current !== action.payload) {
        //클릭했을 때 넘기는 값과 현재의 값이 다를 때만 작동
        state.history.push(state.current); // 이전 상태를 history에 추가
        state.current = action.payload; // 새로운 상태로 설정
      }
    },
    goBack: state => {
      const previousContent = state.history.pop(); // history에서 이전 상태 가져오기
      if (previousContent) {
        state.current = previousContent; // 이전 상태로 복구
      }
    },
    // selectsBoard: state => {
    //   state.history.push(state.current);
    //   state.current = "Board";
    // },
    // selectsTrend: state => {
    //   state.history.push(state.current);
    //   state.current = "Trend";
    // },
    // selectsEncyclopedia: state => {
    //   state.history.push(state.current);
    //   state.current = "Encyclopedia";
    // },
    // selectsMyPosts: state => {
    //   state.history.push(state.current);
    //   state.current = "MyPost";
    // },
    // selectsWrite: state => {
    //   state.history.push(state.current);
    //   state.current = "Write";
    // },
    // selectsEditProfile: state => {
    //   state.history.push(state.current);
    //   state.current = "EditProfile";
    // },
    // selectsFollowing: state => {
    //   state.history.push(state.current);
    //   state.current = "Following";
    // },
    // selectsNoob: state => {
    //   state.history.push(state.current);
    //   state.current = "Noob";
    // },
    // selectsBoard: () => "Board",
    // selectsTrend: () => "Trend",
    // selectsEncyclopedia: () => "Encyclopedia",
    // selectsMyPosts: () => "MyPost",
    // selectsWrite: () => "Write",
    // selectsEditProfile: () => "EditProfile",
    // selectsFollowing: () => "Following",
    // selectsNoob: () => "Noob",
  },
});

export default mainContentsSlice.reducer;
export const {
  // selectsBoard,
  // selectsTrend,
  // selectsEncyclopedia,
  // selectsMyPosts,
  // selectsWrite,
  // selectsEditProfile,
  // selectsFollowing,
  // selectsNoob,
  goBack,
  setContent,
} = mainContentsSlice.actions;
