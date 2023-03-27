import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { animated, useTransition } from "react-spring";

import styled from "styled-components";
import BezierEasing from "bezier-easing";
import { useTypedSelector } from "@/store";
import { navOffAction, selectToggle } from "@/store/toggleSlicer";

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
      name: "SEARCH",
      color: "hsla(263, 0%, 40%, 0.2)",
      path: "/search",
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
  const VH = window.innerHeight;
  const slidePic = useTransition(NavOn, {
    key: NavOn,
    from: {
      y: -VH * 0.4,
      y2: VH * 0.4,
      opacity: 0,
    },
    enter: {
      y: 0,
      y2: 0,
      opacity: 1,
    },
    leave: {
      y: -VH,
      y2: VH,
      opacity: 1,
    },
    config: {
      duration: 1000,
      easing: (t) => easing(t),
    },
  });

  return slidePic(({ y, y2, opacity }, menu) =>
    menu ? (
      <>
        <Slice1
          style={{
            y,
            opacity,
          }}
          ref={wrapperRef}
          onClick={() => dispatch(navOffAction())}
        >
          <Child />
        </Slice1>
        <Slice2
          style={{
            y: y2,
            opacity,
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
  width: 30vw;
  height: 100vh;
  padding-top: 70px;

  background-image: linear-gradient(hsla(35, 0%, 90%, 1), hsla(35, 0%, 75%, 1));

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
  /* font-family: Montserrat; */
  margin: 20px;
  font-weight: 100;
`;
