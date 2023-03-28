import { Product } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetProductsResponse {
  products: Product[];
  success: boolean;
  numberOfPages: any;
  currentPage: any;
}

interface GetProductsVariables {
  category?: string;

  searchTerm?: string;

  currentPage?: number;
  productsPerPage?: string;
}

const url =
  process.env["NODE_ENV"] === "development"
    ? "http://localhost:3000"
    : "https://commerce23.vercel.app";
const productsUrl = () => `${url}/api`;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: productsUrl() }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsVariables>({
      query: ({ category, currentPage, searchTerm, productsPerPage }) => {
        const c = category ? `&category=${category}` : "";
        const s = searchTerm ? `&searchTerm=${searchTerm}` : "";
        const p = productsPerPage ? `&perpage=${productsPerPage}` : "";
        const g = currentPage ? `&page=${currentPage}` : "";

        const finalUrl = `/products?${g}${c}${s}${p}`;
        console.log(finalUrl);

        return finalUrl;
      },
      providesTags: (result) =>
        result!.products.map(({ _id }) => ({ type: "Product", _id })),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
