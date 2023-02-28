import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { useTypedSelector } from "../../store/index";
import {
  navOnAction,
  navOffAction,
  selectToggle,
} from "../../store/toggleSlicer";

const Burger = () => {
  const dispatch = useDispatch();
  //access rootReducer

  const { NavOn } = useTypedSelector(selectToggle);

  //dispatch buttons
  const toggleNav = () => {
    if (NavOn) {
      dispatch(navOffAction());
    } else {
      dispatch(navOnAction());
    }
  };

  useEffect(() => {
    if (NavOn) {
      dispatch(navOnAction());
    }
  }, [dispatch]);

  interface springProps {
    position?: string;
    transform?: string;
  }

  const first = useSpring<springProps>({
    position: "absolute",
    transform: NavOn
      ? "translate(15px, 35px) rotate(-45deg)"
      : "translate(10px, 8px) rotate(0deg)",
  });
  const second = useSpring<springProps>({
    position: "absolute",
    transform: NavOn
      ? "translate(20px, 7px) rotate(45deg)"
      : "translate(10px, 20px) rotate(0deg)",
  });
  const third = useSpring<springProps>({
    position: "absolute",
    transform: NavOn
      ? "translate(15px, 35px) rotate(-45deg)"
      : "translate(10px, 32px) rotate(0deg)",
  });
  const bg = useSpring({
    backgroundColor: NavOn
      ? "hsla(348, 100%, 50%, 0.7)"
      : "hsla(350, 0%, 50%, 0.05)",
  });

  return (
    <Wrap>
      {NavOn ? <BoxX></BoxX> : null}
      <Box onClick={toggleNav}>
        <Lines>
          <OneLine style={first} />
          <OneLine style={second} />
          <OneLine style={third} />
        </Lines>
      </Box>
    </Wrap>
  );
};

export default Burger;

const Wrap = styled.div`
  position: relative;
  top: 5px;
  transform: scale(0.8);
`;

const Box = styled(animated.div)`
  width: 62px;
  height: 47px;

  cursor: pointer;
  :hover {
    /* border: 1px inset hsla(340, 0%, 20%, 1); */
    svg {
      transition: 0.01s;
      /* fill: hsla(348, 100%, 60%, 1); */
    }
  }
`;

const BoxX = styled(Box)`
  position: absolute;
  z-index: 99999999999999;
`;

const Lines = styled.svg`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  transition: 0.8s;
  fill: hsla(35, 25%, 30%, 1);
`;

const OneLine = styled(animated.rect)`
  width: 40px;
  height: 4px;

  transform: translate(0px, 0px) rotate(0deg);
`;
