import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { Margin } from "@/styles/globalSC";
import { useTypedSelector } from "@/store";
import { selectUsers } from "@/store/usersSlicer";

const Dashboard: NextPage = () => {
  const { userInfo } = useTypedSelector(selectUsers);

  return (
    <div>
      <Head>
        <title>Elena's App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Margin>
          <h1 className="h1">Dashboard</h1>
          <Link href="/">Home</Link>
          <div>welcome, {userInfo?.name}</div>
        </Margin>
      </Main>
    </div>
  );
};

export default Dashboard;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  h1 {
    color: black;
  }
`;