import { createSlice } from "@reduxjs/toolkit";

const poketModalControl = createSlice({
  name: "poketmonModalControl",
  initialState: false,
  reducers: {
    poketBuyModalHandler: state => !state,
  },
});

const moreDetailControl = createSlice({
  name: "moreDetail",
  initialState: false,
  reducers: {
    moreDetail: state => !state,
    resetMoreDetail: () => false,
  },
});

const selectPoketmon = createSlice({
  name: "selectPoketmon",
  initialState: {
    id: 0,
    en_name: "",
    ko_name: "",
    en_type: "",
    ko_type: "",
    card_url: "",
    motion_url: "",
    stats: {},
    credit: 0,
  },
  reducers: {
    selectPoket: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const poketModalControlReducer = poketModalControl.reducer;
export const selectPoketmonReducer = selectPoketmon.reducer;
export const moreDetailReducer = moreDetailControl.reducer;

export const { poketBuyModalHandler } = poketModalControl.actions;
export const { selectPoket } = selectPoketmon.actions;
export const { moreDetail, resetMoreDetail } = moreDetailControl.actions;
