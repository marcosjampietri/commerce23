import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

import styled from "styled-components";
import { Margin } from "@/styles/globalSC";
import { AppDispatch, useTypedSelector } from "@/store";
import { selectUsers } from "@/store/usersSlicer";

import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import {
  fetchProducts,
  selectProducts,
  setcurrentPage,
  setproductsPerPage,
} from "@/store/productsSlicer";
import SearchCards from "@/components/Home/SearchCards";
import ProductsLoad from "@/components/Home/ProductCardsLoad";
import { useGetProductsQuery } from "@/store/useGetProductQuery";

const Forum: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentPage, productsPerPage, searchTerm, category } =
    useTypedSelector(selectProducts);

  const {
    data,
    isLoading: loading,
    isFetching,
    error,
    refetch,
  } = useGetProductsQuery({
    currentPage,
    productsPerPage,
    searchTerm,
    category,
  });

  const p = data && data.numberOfPages;

  const pages = Array.from(new Array(p), (val, index) => index + 1);

  const options = ["5", "10", "30"];

  return (
    <div>
      <Head>
        <title>New E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main style={{ paddingTop: "70px" }}>
        <div>
          <div style={{ display: "flex" }}>
            pages:
            {pages.map((page, i) => {
              return (
                <h1
                  style={{ padding: "10px", cursor: "pointer", margin: "5px" }}
                  key={i}
                  onClick={() => {
                    dispatch(setcurrentPage(page));
                  }}
                >
                  {page}
                </h1>
              );
            })}
            <div>products per page</div>
            {options.map((productsPerPage, i) => (
              <div
                key={i}
                style={{ margin: "20px" }}
                onClick={() => {
                  dispatch(setproductsPerPage(productsPerPage));
                  dispatch(setcurrentPage(1));
                }}
              >
                {productsPerPage}
              </div>
            ))}
          </div>
          {loading && <ProductsLoad />}
          <SearchCards />
        </div>
      </Main>
    </div>
  );
};

export default Forum;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  h1 {
    color: black;
  }
`;