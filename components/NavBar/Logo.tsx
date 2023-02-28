import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { below } from "@/styles/breakpoints";

const Logo = () => {
  return (
    <Icon href="/">
      <Image src={"/vercel.svg"} width={50} height={50} alt={"logo"} />
    </Icon>
  );
};

export default Logo;

const Icon = styled(Link)`
  position: absolute;
  left: 50vw;
  top: 22px;
  transform: translateX(-50%);
  img {
    width: 100px;
    height: 100%;

    padding: 5px;
    cursor: pointer;
    filter: drop-shadow(0px 0px 50px hsla(340, 100%, 70%, 0.3));
  }

  ${below.small`display: none;`}
`;
