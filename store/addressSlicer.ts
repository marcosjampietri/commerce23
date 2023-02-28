import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/index";
import axios from "axios";

interface inputAddressType {
  fullname?: string;
  Line1?: string;
  Line2?: string;
  Line3?: string;
  City?: string;
  PostalCode?: string;
  CountryName?: string;
}

interface AddressState {
  activeAddress: any;
  newAddress: boolean;
  editSubmission: boolean;
  inputAddress: inputAddressType | null;
}
const initialState = {
  activeAddress: 0,
  newAddress: true,
  editSubmission: false,
  inputAddress: null,
} as AddressState;

interface addressArgsType {
  id?: string;
  userAddress: object;
}

export const addAddress = createAsyncThunk(
  "users/addAddress",
  async (userArgs: addressArgsType, { rejectWithValue }) => {
    const { id, userAddress } = userArgs;

    try {
      const addRes = await axios.post("/api/users/address", {
        id,
        userAddress,
      });
      return addRes;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const addressSlicer = createSlice({
  name: "address",
  initialState,
  reducers: {
    setactiveAddress(state, { payload }) {
      state.activeAddress = payload;
    },
    setinputAddress(state, { payload }) {
      console.log("payload", payload);
      state.inputAddress = payload;
    },
    seteditSubmission(state, { payload }) {
      state.editSubmission = payload;
    },
    newAddressOn(state) {
      state.newAddress = true;
    },
    newAddressOff(state) {
      state.newAddress = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAddress.pending, (state) => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(addAddress.fulfilled, (state, { payload }) => {
      return {
        ...state,
        userLoading: false,
        userInfo: payload.data,
        errorMsg: "",
      };
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      return {
        ...state,
        userLoading: false,
        // userInfo: payload.data,
        errorMsg: action.payload,
      };
    });
  },
});

export const {
  setactiveAddress,
  setinputAddress,
  seteditSubmission,
  newAddressOn,
  newAddressOff,
} = addressSlicer.actions;
export const selectAddress = (state: AppState) => <AddressState>state.address;
export default addressSlicer.reducer;
