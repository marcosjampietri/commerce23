import styled from "styled-components";
import { useTypedSelector } from "../../store/index";

import { Product } from "@/types/product";
import { selectProducts } from "@/store/productsSlicer";
import { useGetProductsQuery } from "@/store/useGetProductQuery";

import SingleCard from "./ProductCardSingle";
import ProductsLoad from "./ProductCardsLoad";
import { useEffect } from "react";

const SearchProducts = () => {
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

  useEffect(() => {
    refetch();
  }, [category]);

  const productList = data && data.products;

  return (
    <New>
      <Title>RESULTS</Title>

      <Table>
        {loading && <ProductsLoad />}
        {productList &&
          productList.map((product: Product, index: number) => (
            <SingleCard product={product} key={index} />
          ))}
      </Table>
    </New>
  );
};

export default SearchProducts;

export const New = styled.section`
  width: 100vw;
  padding: 0px 20px;
`;

export const Title = styled.h1`
  width: 100%;
  max-width: 500px;
  margin: 0px auto 50px;
  padding: 20px;

  font-family: Montserrat;
  text-align: center;
  font-weight: 200;
  letter-spacing: 0.4em;
  font-size: clamp(2em, 4vw, 3em);

  color: hsla(0, 0%, 45%, 1);
  border-bottom: 1px solid hsla(0, 0%, 60%, 1);
`;

export const Table = styled.div`
  max-width: 1200px;
  margin: 0px auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
