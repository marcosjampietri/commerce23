import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { AppDispatch, useTypedSelector } from "../../store/index";
import { FiStar } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

import { Product } from "@/types/product";
import { setcategory } from "@/store/productsSlicer";
import {
  addToCart,
  decreaseQty,
  getTotals,
  increaseQty,
  removeFromCart,
  selectCart,
} from "@/store/cartSlicer";

import { useRouter } from "next/router";

const SingleCard = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const product: Product = props.product;

  const { yourCart } = useTypedSelector(selectCart);
  const qty = (productID: string) =>
    yourCart[yourCart.findIndex((x: any) => x._id === productID)].quantity;

  return (
    <ProductCard>
      {product.stock == 0 && <StockInfo>SOLD OUT</StockInfo>}
      {product.stock == 1 && (
        <StockInfo
          style={{
            backgroundImage: "linear-gradient(145deg, orange, #f8c15a, orange)",
          }}
        >
          LAST ITEM
        </StockInfo>
      )}
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.images[0]}
          alt={product.title}
          width={350}
          height={400}
          id="pic"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
            width: "100%",
            height: "200px",
            margin: "0px 5px",
          }}
        />
      </Link>
      <Tags>
        {product.categories?.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              router.push("/search");
              dispatch(setcategory(item));
            }}
          >{`${item} - `}</div>
        ))}
      </Tags>
      <Star>
        {[...Array(5)].map((_, index) => (
          <FiStar key={index} />
        ))}
      </Star>
      <ProductName>
        <h2>{product.title.toUpperCase()}</h2>
      </ProductName>

      <Price>
        <h3>£ {product.price} </h3>
        <h4>£ {(product.price * 1.2).toFixed(2)} </h4>
      </Price>

      <Controls>
        {!yourCart.find((x: any) => x._id === product._id) ? (
          <Add>
            <button
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(getTotals());
              }}
            >
              ADD TO CART
            </button>
          </Add>
        ) : (
          <Quantity>
            <Button
              onClick={() => {
                if (qty(product._id) > 1) {
                  dispatch(decreaseQty(product._id));
                } else {
                  dispatch(removeFromCart(product._id));
                }
                dispatch(getTotals());
              }}
            >
              <FaMinus />
            </Button>
            <h3>{qty(product._id)}</h3>
            <Button
              onClick={() => {
                dispatch(increaseQty(product));
                dispatch(getTotals());
              }}
            >
              <FaPlus />
            </Button>
          </Quantity>
        )}
      </Controls>
    </ProductCard>
  );
};

export default SingleCard;

const ProductCard = styled.div`
  position: relative;
  max-width: 37vw;
  min-width: 110px;
  margin: 20px 3vw;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 200px;
`;

const ProductName = styled.div`
  margin: 0px 0px;

  h2 {
    margin: 0px 0px;
    min-height: 2em;
    font-weight: 400;
    font-size: clamp(0.8em, 1.2vw, 1em);
    color: hsla(0, 0%, 10%, 1);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Price = styled.div`
  margin: 5px 0px;
  padding: 5px 0px;

  border-top: 1px solid hsla(0, 0%, 80%, 1);

  h3,
  h4 {
    padding: 0px 10px 0px 0px;
    font-size: clamp(0.8em, 1.2vw, 1em);
    font-weight: 200;
  }
  h3 {
    color: hsla(0, 90%, 0%, 1);
  }

  h4 {
    color: hsla(0, 0%, 80%, 1);
    text-decoration: line-through;
  }

  span {
    margin: 0px 5px;
  }

  display: flex;
`;

const Star = styled.div`
  position: relative;
  left: -4px;
  margin: 4px 0px;

  svg {
    fill: hsla(35, 100%, 50%, 1);
    stroke: none;
    font-size: 1.3em;
  }
`;
const Tags = styled.div`
  margin: 4px 0px;
  color: hsla(240, 50%, 40%, 1);
  font-size: 0.7em;

  display: flex;

  div {
    cursor: pointer;
  }
`;

const Controls = styled.div`
  width: 100%;
`;

const Add = styled.div`
  button {
    cursor: pointer;
    width: 100%;
    height: 50px;

    background-color: hsla(34, 25%, 55%, 1);
    border: 1px solid hsla(0, 0%, 100%, 1);
    border-radius: 4px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }
`;

const Quantity = styled.div`
  height: 50px;
  width: 100%;

  padding: 4px;

  border-radius: 4px;
  box-shadow: inset 1px 1px 5px hsla(0, 0%, 50%, 0.3);

  display: flex;

  align-items: center;
  justify-content: center;

  h3 {
    width: 100%;
    padding: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Button = styled.div`
  width: 100%;
  max-width: 100px;
  height: 100%;

  border-radius: 2px;
  background-color: hsla(34, 25%, 55%, 1);
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: white;
  }
`;

const StockInfo = styled.div`
  position: absolute;
  right: 0px;
  width: 50px;
  height: 50px;

  border-radius: 50%;
  background-image: linear-gradient(145deg, red, #ff8585, red);
  transform: translate(50%, -50%);

  color: white;
  font-weight: 900;
  font-size: 12px;

  display: grid;
  place-items: center;
  text-align: center;
`;
