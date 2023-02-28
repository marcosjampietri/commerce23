import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper, persistor, useTypedSelector, AppDispatch } from "../store/";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyle } from "../styles/globalSC";
import { useRouter } from "next/router";
import { Transition, animated, config } from "react-spring";
import styled from "styled-components";
import { Montserrat, Poppins } from "next/font/google";

const ms = Montserrat({ subsets: ["latin"] });
const pp = Poppins({ weight: "200", subsets: ["latin"] });

import NavBar from "../components/NavBar/";
import Top from "@/components/General/Top";
import Menu from "@/components/General/Menu";
import OrderPanel from "@/components/General/OrderPanel";
import Loader from "@/components/General/Loader";
import { selectUsers } from "@/store/usersSlicer";
import { selectload, setSubmitting } from "@/store/loadSlicer";
import { useEffect } from "react";

function MyApp({ Component, pageProps, router, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <AppChild
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </Provider>
      </PersistGate>
    </>
  );
}

const AppChild = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];

  //App reloader
  const { userLoading, errorMsg } = useTypedSelector(selectUsers);
  const { submitting } = useTypedSelector(selectload);

  useEffect(() => {
    if (!userLoading && submitting) {
      if (!errorMsg) {
        router.reload();
      } else dispatch(setSubmitting(false));
    }
  }, [userLoading, submitting, errorMsg]);

  return (
    <>
      {submitting && !errorMsg ? (
        <WrapLoader>
          <Loader />
        </WrapLoader>
      ) : null}
      <GlobalStyle />
      <NextChild className={`${pp.className}`}>
        {/* <NextChild className={`${ms.className} ${pp.className}`}> */}
        <Top />
        <NavBar />
        <Menu />
        <OrderPanel />
        <StyledDiv>
          <Transition
            items={items}
            keys={(item: any) => item.id}
            config={config.slow}
            from={{
              position: "absolute",
              opacity: 0,
            }}
            initial={{ opacity: 0 }}
            enter={{
              position: "absolute",
              opacity: 1,
            }}
            leave={{
              position: "absolute",
              opacity: 0,
            }}
          >
            {(
              styles,
              { pageProps: animatedPageProps, Component: AnimatedComponent },
              key: string
            ) => (
              <animated.div
                key={key}
                style={{
                  ...styles,
                  width: "100%",
                  height: "100%",
                }}
              >
                <AnimatedComponent {...animatedPageProps} />
              </animated.div>
            )}
          </Transition>
        </StyledDiv>
      </NextChild>
    </>
  );
};

const NextChild = styled.div`
  width: 100vw;
  height: 100%;
`;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100%;
`;

export const WrapLoader = styled.div`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  background: hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(3px);

  display: grid;
  place-items: center;
`;

export default MyApp;
