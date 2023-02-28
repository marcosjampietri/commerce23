import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import styled from "styled-components";

const Success: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <div>Thanks for Coming This Far!</div>
        <div>GET IN TOUCH: +44 07541505202</div>
        <NextLink href="/" passHref>
          <div style={{ cursor: "pointer" }}>BACK TO HOME</div>
        </NextLink>
      </Main>
    </div>
  );
};

export default Success;

const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  div {
    margin: 10px;
  }
`;
