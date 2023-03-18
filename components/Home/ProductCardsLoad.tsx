import { Product } from "@/types/product";
import styled, { keyframes } from "styled-components";

const ProductsLoad = () => {
  return (
    <>
      {[...Array(10)].map((product: Product, index: number) => (
        <CardSkeleton>
          <PictureSkeleton />
          <ProductSkeleton>&zwnj;</ProductSkeleton>
          <ProductSkeleton>&zwnj;</ProductSkeleton>
          <ProductSkeleton style={{ width: "40%" }}>&zwnj;</ProductSkeleton>
          <ProductSkeleton
            style={{ width: "60%", height: "24px", marginTop: "8px" }}
          />
        </CardSkeleton>
      ))}
    </>
  );
};

export default ProductsLoad;

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const CardSkeleton = styled.div`
  position: relative;
  width: 220px;
  max-width: 37vw;
  min-width: 180px;
  height: 378px;
  margin: 20px 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5f5f5;

  /* position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 200px; */
`;

const ProductSkeleton = styled.div<{
  height?: string;
  width?: string;
  marginTop?: string;
}>`
  display: inline-block;
  height: ${(props) => props.height || "14px"};
  width: ${(props) => props.width || "80%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: ${(props) => props.marginTop || "0"};
`;

const PictureSkeleton = styled(ProductSkeleton)`
  width: 100%;
  max-width: 150px;
  height: 150px;
  margin-bottom: 16px;
  margin: auto;

  display: block;
`;
