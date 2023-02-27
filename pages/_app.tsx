import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper, persistor } from "../store/";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyle } from "../styles/globalSC";
import { useRouter } from "next/router";
import { Transition, animated, config } from "react-spring";
import styled from "styled-components";
import { Montserrat, Bebas_Neue } from "@next/font/google";

const ms = Montserrat({ subsets: ["latin"] });
const bn = Bebas_Neue({ weight: "400", subsets: ["latin"] });

import NavBar from "../components/NavBar/";

import Top from "../components/Top";
import Menu from "../components/Menu";

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
  const dispatch = useDispatch();

  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];

  return (
    <>
      <GlobalStyle />
      <NextChild className={`${ms.className}`}>
        {/* <NextChild className={`${ms.className} ${bn.className}`}> */}
        <Top />
        <NavBar />
        <Menu />
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

// export default wrapper.withRedux(MyApp);
export default MyApp;
