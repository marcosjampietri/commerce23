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
  page?: number;
  searchTerm?: string;
  perPage?: string;
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
      query: ({ category, page, searchTerm, perPage }) => {
        const c = category ? `category=${category}` : "";
        const s = searchTerm ? `&searchTerm=${searchTerm}` : "";
        const p = perPage ? `&perpage=${perPage}` : "";

        const finalUrl = `/products?&page=${page}${c}${s}${p}`;
        console.log(finalUrl);

        return finalUrl;
      },
      providesTags: (result) =>
        result!.products.map(({ _id }) => ({ type: "Product", _id })),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
