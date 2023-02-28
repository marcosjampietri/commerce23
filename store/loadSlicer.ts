import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface loadState {
  submitting: boolean;
}

const initialState = {
  submitting: false,
  // loading: false,
} as loadState;

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setSubmitting(state, { payload }) {
      state.submitting = payload;
    },
    // setLoading: (state, { payload }) => {
    //   return {
    //     ...state,
    //     loading: payload,
    //   };
    // },
  },
});

export const {
  setSubmitting,
  // setLoading
} = loadSlice.actions;
export const selectload = (state: AppState) => state.load;
export default loadSlice.reducer;
