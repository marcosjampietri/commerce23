import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface StepState {
  step: number;
  newAddress: boolean;
}
const initialState = { step: 0, newAddress: true } as StepState;

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    ship(state) {
      state.step = 0;
    },
    review(state) {
      state.step = 1;
    },
    pay(state) {
      state.step = 2;
    },
  },
});

export const { ship, review, pay } = stepperSlice.actions;
export const selectStep = (state: AppState) => state.stepper;
export default stepperSlice.reducer;
