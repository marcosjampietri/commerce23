import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  getTotals,
} from "../store/cartSlicer";

import { AppState, useTypedSelector } from "../store/index";
import { Product } from "../types/product";

const CartPage = () => {
  const dispatch = useDispatch();

  const { yourCart, itemsTotal } = useTypedSelector(
    (state: AppState) => state.cart
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Top>
          <h1>Shopping Cart</h1>
          <h2>{yourCart.length} Items</h2>
        </Top>

        <Basket>
          {yourCart.length == 0 ? (
            <NextLink href="/" passHref>
              <Back>OMG YOUR BASKET IS EMPTY... GO TREAT YOURSELF!!</Back>
            </NextLink>
          ) : (
            yourCart.map((product: Product, index: number) => (
              <ProductOnCart key={index}>
                <NextLink href={`/product/${product._id}`} passHref>
                  <Image
                    width={300}
                    height={100}
                    src={product.image}
                    alt={product.title}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "20vw",
                      height: "120px",
                    }}
                  />
                </NextLink>
                <Text>
                  <h2>{product.title}</h2>
                  <div>£{product.price}</div>
                </Text>

                <Quantity>
                  <Button
                    onClick={() => {
                      dispatch(increaseQty(product._id));
                      dispatch(getTotals());
                    }}
                  >
                    <FaPlus />
                  </Button>
                  <h3>{product.quantity}</h3>
                  <Button
                    onClick={() => {
                      dispatch(decreaseQty(product._id));
                      dispatch(getTotals());
                    }}
                  >
                    <FaMinus />
                  </Button>
                </Quantity>

                <Price>£{product.itemTotal}</Price>

                <Remove
                  onClick={() => {
                    dispatch(removeFromCart(product._id));
                    dispatch(getTotals());
                  }}
                >
                  <FaTrashAlt />
                </Remove>
              </ProductOnCart>
            ))
          )}
        </Basket>

        {yourCart.length > 0 ? (
          <Finish>
            <Total>
              <h3>Total Price</h3>
              <h3>£ {itemsTotal}</h3>
            </Total>
            <NextLink href="/checkout" passHref>
              <Pay>GO TO CHECKOUT</Pay>
            </NextLink>
            <div> OR </div>
            <NextLink href="/" passHref>
              <Back>CONTINUE SHOPPING MORE ITEMS</Back>
            </NextLink>
          </Finish>
        ) : null}
      </Page>
    </>
  );
};

export default CartPage;

const Page = styled.div`
  max-width: 1000px;
  min-height: 100vh;
  margin: 0px auto;
`;

const Top = styled.div`
  margin: 80px auto 40px;
  width: 90%;
  padding-bottom: 10px;
  border-bottom: 1px solid grey;

  display: flex;
  justify-content: space-between;

  h1,
  h2 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: clamp(1em, 2vw, 2em);
    color: hsla(0, 0%, 40%, 1);
  }
`;

const Basket = styled.div`
  padding-bottom: 200px;
`;

const ProductOnCart = styled.div`
  position: relative;
  margin: 25px auto;
  width: 90%;
  height: 120px;

  background: hsla(0, 0%, 97%, 1);
  border-bottom: 1px solid lightgrey;
  box-shadow: 0px 6px 20px hsla(260, 40%, 35%, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Text = styled.div`
  flex-grow: 1;
  width: 50px;
  height: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    margin: 0px 0px 10px;

    text-transform: capitalize;
    font-weight: 600;
    font-size: clamp(0.9em, 1.5vw, 1.2em);
    color: hsla(206, 90%, 12%, 1);
  }
`;

const Quantity = styled.div`
  width: 20%;

  height: 90%;
  margin: 0px auto;
  padding: 4px;

  border-radius: 4px;
  box-shadow: inset 1px 1px 5px hsla(0, 0%, 50%, 0.3);

  display: flex;
  flex-direction: column;
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

const Price = styled.div`
  width: 70px;
  // height: 100px;
  padding: 0px 0px 13px 10px;
  align-self: end;
  justify-self: end;

  font-weight: 700;
  color: hsla(206, 90%, 22%, 1);
`;

const Button = styled.button`
  width: 100%;
  // max-width: 100px;
  height: 100%;

  border-radius: 2px;
  background-color: hsla(34, 29%, 53%, 1);
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: white;
  }
`;

const Remove = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  margin: 0px;
  width: 50px;
  height: 50px;
  font-size: 20px;

  border-radius: 50px;
  box-shadow: 1px 1px 5px hsla(0, 0%, 50%, 0.3);
  background: hsla(0, 0%, 97%, 1);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: hsla(206, 90%, 12%, 1);
  }
`;

const Finish = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 220px;
  padding: 10px;

  background: white;
  box-shadow: 0px -4px 15px hsla(0, 0%, 50%, 0.3);

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: red;
  }
`;
const Total = styled.div`
  position: relative;

  width: 90%;
  max-width: 300px;
  padding: 10px 0px;

  border-top: 2px solid red;
  font-size: 12px;

  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0px;
  }
`;

const Pay = styled.button`
  position: relative;
  width: 100vw;
  height: 50px;
  max-width: 300px;
  margin: 10px auto;

  background-color: hsla(340, 90%, 50%, 1);
  color: white;
  border: none;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled.div`
  width: 100vw;
  max-width: 300px;
  height: 55px;
  margin: 10px auto;
  padding: 20px;

  font-size: 12px;

  cursor: pointer;
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
  text-align: center;
`;
