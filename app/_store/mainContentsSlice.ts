import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainContentsState {
  current: string;
  history: string[];
}

const initialState: MainContentsState = {
  current: "소식",
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
  },
});

export default mainContentsSlice.reducer;
export const { goBack, setContent } = mainContentsSlice.actions;
