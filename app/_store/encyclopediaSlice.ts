import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { poketmonType } from "../_types/encyclopedia";

const poketModalControl = createSlice({
  name: "poketmonModalControl",
  initialState: false,
  reducers: {
    poketBuyModalHandler: state => !state,
    resetPoketBuyModalHandler: () => false,
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
    selectPoket: (state, action: PayloadAction<poketmonType>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const poketModalControlReducer = poketModalControl.reducer;
export const selectPoketmonReducer = selectPoketmon.reducer;
export const moreDetailReducer = moreDetailControl.reducer;

export const { poketBuyModalHandler, resetPoketBuyModalHandler } =
  poketModalControl.actions;
export const { selectPoket } = selectPoketmon.actions;
export const { moreDetail, resetMoreDetail } = moreDetailControl.actions;
