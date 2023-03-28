import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/product";
import { AppState } from "./index";
import axios from "axios";

export interface ProductsState {
  list: Product[];
  loading: boolean;
  pages: number;
  currentPage?: number;
  productsPerPage?: string;
  searchTerm: string;
  category: string;
}
interface prodArgsType {
  currentPage?: any;
  productsPerPage?: any;
}

const initialState = {
  list: [],
  loading: false,
  pages: 0,
  currentPage: 1,
  productsPerPage: "",
  searchTerm: "",
  category: "",
} as ProductsState;

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async (prodArgs?: prodArgsType) => {
    const { currentPage, productsPerPage } = prodArgs!;

    const url =
      process.env["NODE_ENV"] === "development" ? "http://localhost:3000" : "";
    const query = prodArgs
      ? `?page=${currentPage}&perpage=${productsPerPage}`
      : "";

    const productsUrl = () => `${url}/api/products${query}`;
    const { data } = await axios({
      url: productsUrl(),
      method: "get",
    });
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setcurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setproductsPerPage(state, { payload }) {
      state.productsPerPage = payload;
    },
    setsearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
    setcategory(state, { payload }) {
      state.category = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = payload.products;
      state.pages = payload.numberOfPages;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setcurrentPage,
  setproductsPerPage,
  setsearchTerm,
  setcategory,
} = productsSlice.actions;
export const selectProducts = (state: AppState) => state.products;
export default productsSlice.reducer;
