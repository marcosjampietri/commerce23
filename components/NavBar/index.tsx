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

const NavBar = () => {
  return (
    <>
      <Nav>
        <Margin style={{ justifyContent: "space-between" }}>
          <Burguer />
          <Logo
            href="/"
            style={{ fontWeight: "900", color: "hsla(35, 25%, 30%, 1)" }}
          >
            <Image
              src="./next.svg"
              width={50}
              height={50}
              alt={"logo"}
              style={{ background: "lightgrey", padding: "5px" }}
            />
          </Logo>
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

const Div = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 10px auto;

  display: flex;
  justify-content: end;
  align-items: center;

  a {
    color: hsla(38, 100%, 60%, 1);
  }
`;

const Logo = styled(Link)`
  width: 100px;
  height: 100%;

  background: transparent;
  cursor: pointer;
  filter: drop-shadow(0px 0px 50px hsla(340, 100%, 70%, 0.3));
`;
