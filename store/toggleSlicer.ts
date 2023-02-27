import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface toggleState {
  // CartOn: boolean;
  NavOn: boolean;
  ModOn: boolean;
}

const initialState = {
  // CartOn: false,
  NavOn: false,
  ModOn: false,
} as toggleState;

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    // cartOnAction(state) {
    //     state.CartOn = true
    // },
    // cartOffAction(state) {
    //     state.CartOn = false
    // },
    navOnAction(state) {
      state.NavOn = true;
    },
    navOffAction(state) {
      state.NavOn = false;
    },
    modOnAction(state) {
      state.ModOn = true;
    },
    modOffAction(state) {
      state.ModOn = false;
    },
  },
});

export const {
  // cartOnAction, cartOffAction,
  navOnAction,
  navOffAction,
  modOnAction,
  modOffAction,
} = toggleSlice.actions;
export const selectToggle = (state: AppState) => state.toggle;
export default toggleSlice.reducer;
