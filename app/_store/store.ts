import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mainContentsReducer from "./mainContentsSlice";
import postsReducer from "./postsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    mainContents: mainContentsReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
