import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mainContentsReducer from "./mainContentsSlice";
import postsReducer from "./postsSlice";
import {
  moreDetailReducer,
  poketModalControlReducer,
  selectPoketmonReducer,
} from "./encyclopediaSlice";
import { localFollowReducer, serverFollowReducer } from "./followSlice";
import searchUserNameReducer from "./searchUserName";
const store = configureStore({
  reducer: {
    user: userReducer,
    mainContents: mainContentsReducer,
    posts: postsReducer,
    ModalControl: poketModalControlReducer,
    selectPoket: selectPoketmonReducer,
    moreDetail: moreDetailReducer,
    serverFollow: serverFollowReducer,
    localFollowReducer: localFollowReducer,
    searchUserName: searchUserNameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
