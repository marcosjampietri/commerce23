import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import { animated } from "react-spring";
import { GiShoppingBag } from "react-icons/gi";

import { below } from "../../styles/breakpoints";
import { selectCart } from "@/store/cartSlicer";
import { useTypedSelector } from "@/store/index";
import { cartOffAction, cartOnAction } from "@/store/toggleSlicer";

const CartIcon = () => {
  const { yourCart } = useTypedSelector(selectCart);
  const { CartOn } = useTypedSelector(selectCart);
  const dispatch = useDispatch();

  const empty = yourCart.length == 0;

  const toggleCart = () => {
    if (CartOn) {
      dispatch(cartOffAction());
    } else {
      dispatch(cartOnAction());
    }
  };

  return (
    <Wrap>
      <Cart onClick={toggleCart}>
        <GiShoppingBag />
        <Number className={`${empty ? "" : "red"}`}>{yourCart.length}</Number>
      </Cart>
    </Wrap>
  );
};

export default CartIcon;

const Wrap = styled.div`
  position: relative;
  top: -2px;
  width: 50px;
  height: 50px;
`;

const Number = styled.div`
  position: absolute;
  // left: 13px;
  top: 20px;
  width: 45%;
  height: 45%;

  color: white;
  font-weight: 500;
  background-color: hsla(360, 100%, 50%, 0);
  border-radius: 50%;
  transition: 1s;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cart = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .red {
    transition: 1s;
    background-color: hsla(340, 100%, 50%, 1);
  }

  svg {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    fill: hsla(206, 90%, 0%, 1);

    filter: drop-shadow(0px 0px 10px hsla(0, 0%, 100%, 0.5));
  }
`;
