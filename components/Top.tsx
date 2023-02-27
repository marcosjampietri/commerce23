import React, { useState, useEffect } from "react";
import { animated, useTransition, config, useScroll } from "react-spring";
import useScrollTo from "react-spring-scroll-to-hook";
import styled from "styled-components";

import { BiArrowToTop } from "react-icons/bi";

const Top = () => {
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      setScrolling(true);
    };
  }, [scrolling]);

  if (scrolling) {
    setTimeout(() => {
      setScrolling(false);
    }, 5000);
  }

  const transitions = useTransition(scrolling, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: scrolling,
    delay: 100,
    config: config.slow,
  });

  const { scrollTo }: any = useScrollTo(config.slow);

  return (
    <>
      {transitions((styles, item) =>
        item ? (
          <TopSt
            style={{
              ...styles,
            }}
            onClick={scrollTo}
          >
            <BiArrowToTop />
          </TopSt>
        ) : null
      )}
    </>
  );
};

export default Top;

const TopSt = styled(animated.button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;

  svg {
    width: 80%;
    height: 80%;
    padding: 10%;

    fill: white;
    stroke: white;
  }

  cursor: pointer;
  color: white;
  border: none;
  border-radius: 50%;

  background-color: hsla(34, 25%, 55%, 1);

  z-index: 60;

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: -7px;
    left: -7px;
    width: 62px;
    height: 62px;
    background-color: transparent;
    border: 1px solid hsla(34, 25%, 55%, 0.5);
    border-radius: 50%;
    z-index: 50;
  }
`;
