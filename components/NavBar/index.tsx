import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { animated } from "react-spring";

// import { below } from "../../styles/breakpoints";
import Burguer from "./Hamburguer";

const NavBar = () => {
  return (
    <>
      <Nav>
        <Margin>
          <Link
            href="/"
            style={{ fontWeight: "900", color: "hsla(35, 25%, 30%, 1)" }}
          >
            LOGO
          </Link>
          {/* <Link href="/about" style={{ fontWeight: "900", color: "white" }}>
            ABOUT
          </Link> */}

          <Burguer />
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

const Margin = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: hsla(38, 100%, 60%, 1);
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100%;

  background: transparent;
  cursor: pointer;
  // filter: drop-shadow(0px 0px 50px hsla(340, 100%, 70%, 0.3));
`;
