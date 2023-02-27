import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  animated,
  useSpring,
  useTrail,
  useTransition,
  config,
} from "react-spring";

import styled from "styled-components";
import BezierEasing from "bezier-easing";
import { useTypedSelector } from "../store/index";
import { navOnAction, navOffAction, selectToggle } from "../store/toggleSlicer";

const useOutsideAlerter = (ref: React.RefObject<HTMLElement>) => {
  const dispatch = useDispatch();

  const { NavOn } = useTypedSelector(selectToggle);
  useEffect(() => {
    if (NavOn) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(navOffAction());
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, dispatch, NavOn]);
};

const Child = () => {
  const menuItems = [
    {
      name: "HOME",
      color: "hsla(263, 0%, 40%, 0.2)",
      path: "/",
      target: undefined,
    },
    {
      name: "ABOUT",
      color: "hsla(263, 0%, 40%, 0.2)",
      path: "/about",
      target: undefined,
    },
    {
      name: "WORKS",
      color: "hsla(263, 0%, 20%, 0.2)",
      path: "/works",
      target: undefined,
    },
    {
      name: "CONTACT",
      color: "hsla(263, 0%, 30%, 0.2)",
      path: "/contact",
      target: undefined,
    },
  ];
  return (
    <Div>
      {menuItems.map((item, i) => (
        <Link key={i} href={item.path}>
          <H2>{item.name}</H2>
        </Link>
      ))}
    </Div>
  );
};

const Menu = () => {
  const dispatch = useDispatch();

  const { NavOn } = useTypedSelector(selectToggle);

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  const easing = BezierEasing(0.95, 0, 0, 1);
  const VW = window.innerWidth;
  const slidePic = useTransition(NavOn, {
    key: NavOn,
    from: {
      x: -VW,
      x2: VW,
      opacity: 0,
    },
    enter: {
      x: 0,
      x2: 0,
      opacity: 1,
    },
    leave: {
      x: -VW,
      x2: VW,
      opacity: 0,
    },
    config: {
      duration: 1000,
      easing: (t) => easing(t),
    },
  });

  return slidePic(({ x, x2 }, menu) =>
    menu ? (
      <>
        <Slice1
          style={{
            x,
          }}
          ref={wrapperRef}
          onClick={() => dispatch(navOffAction())}
        >
          <Child />
        </Slice1>
        <Slice2
          style={{
            x: x2,
          }}
          ref={wrapperRef}
          onClick={() => dispatch(navOffAction())}
        >
          <Child />
        </Slice2>
      </>
    ) : null
  );
};

export default Menu;

//style------------------------------------------------------------------

const Whole = styled(animated.div)`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 8;
  width: 100vw;
  height: 100vh;
  padding-top: 70px;

  background-image: linear-gradient(
    hsla(35, 15%, 90%, 1),
    hsla(35, 15%, 75%, 1)
  );

  // display: flex;
  // align-items: center;
  /* pointer-events: none; */
`;

const Slice1 = styled(Whole)`
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
`;

const Slice2 = styled(Whole)`
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  font-size: clamp(30px, 10vw, 70px);
  font-family: Montserrat;
  margin: 20px;
  font-weight: 100;
`;
