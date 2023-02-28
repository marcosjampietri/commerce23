import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { animated } from "react-spring";

// import { below } from "../../styles/breakpoints";
import Burguer from "./Hamburguer";
import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";
import { Margin } from "@/styles/globalSC";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <>
      <Nav>
        <Margin style={{ justifyContent: "space-between" }}>
          <Burguer />
          <Logo />
          <div style={{ display: "flex" }}>
            <UserIcon />
            <CartIcon />
          </div>
        </Margin>
      </Nav>
    </>
  );
};

export default NavBar;

const Nav = styled.nav`
  position: fixed;
  width: 100vw;
  height: 70px;

  padding: 10px 20px;

  background: hsla(42, 0%, 50%, 0);
  z-index: 14;
  transition: 0.5s;
  backdrop-filter: blur(3px);
  font-family: Modena Sans;

  :hover {
    transition: 0.2s;
    /* background: hsla(42, 0%, 0%, 0.5); */
  }

  display: flex;
  align-items: center;
`;
