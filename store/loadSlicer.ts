import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface loadState {
  complete: boolean;
}

const initialState = {
  complete: false,
  loading: false,
} as loadState;

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setComplete(state, { payload }) {
      state.complete = payload;
    },
    setLoading: (state, { payload }) => {
      return {
        ...state,
        loading: payload,
      };
    },
  },
});

export const { setComplete, setLoading } = loadSlice.actions;
export const selectload = (state: AppState) => state.load;
export default loadSlice.reducer;
