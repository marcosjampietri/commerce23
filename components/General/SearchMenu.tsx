import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { animated, useTransition } from "react-spring";
import { useRouter } from "next/router";
import styled from "styled-components";
import BezierEasing from "bezier-easing";

import { useTypedSelector } from "@/store";
import { navOffAction, selectToggle } from "@/store/toggleSlicer";
import { setcategory, setcurrentPage } from "@/store/productsSlicer";
import Link from "next/link";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const inSearch = router.pathname == "/search";

  const menuItems = [
    {
      name: "All Products",
      cat: "",
    },
    {
      name: "Laptops",
      cat: "laptops",
    },
    {
      name: "Groceries",
      cat: "groceries",
    },
    {
      name: "Skincare",
      cat: "skincare",
    },
    {
      name: "Home-Decoration",
      cat: "home-decoration",
    },
    {
      name: "Fragrances",
      cat: "fragrances",
    },
  ];
  return (
    <Div>
      <Link href="/">
        <div style={{ color: "black", margin: "10px", fontSize: "2em" }}>
          HOME
        </div>
      </Link>
      {menuItems.map((item, i) => (
        <CatItem
          key={i}
          onClick={() => {
            !inSearch && router.push("/search");
            dispatch(setcategory(item.cat));
            dispatch(setcurrentPage(1));
          }}
        >
          {item.name}
        </CatItem>
      ))}
    </Div>
  );
};

const SearchMenu = () => {
  const dispatch = useDispatch();

  const { NavOn } = useTypedSelector(selectToggle);

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  const easing = BezierEasing(0.7, 0, 0, 1);
  const VW = window.innerWidth;
  const transition = useTransition(NavOn, {
    key: NavOn,
    from: {
      x: -VW * 0.3,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: -VW,
      opacity: 1,
    },
    config: {
      duration: 800,
      easing: (t) => easing(t),
    },
  });

  return transition(({ x, opacity }, menu) =>
    menu ? (
      <Whole
        style={{
          x,
          opacity,
        }}
        ref={wrapperRef}
        onClick={() => dispatch(navOffAction())}
      >
        <Child />
      </Whole>
    ) : null
  );
};

export default SearchMenu;

//style------------------------------------------------------------------

const Whole = styled(animated.div)`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 16;
  height: 100vh;
  padding-top: 70px;

  background-image: linear-gradient(
    hsla(35, 0%, 100%, 1),
    hsla(35, 0%, 95%, 1)
  );
  border: 1px #c8c8c8 solid;
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

const CatItem = styled.div`
  margin: 10px;
  padding: 10px;
  font-size: 20px;
  font-family: Montserrat;
  font-weight: 300;

  cursor: pointer;
  color: black;

  :hover {
    color: #9d9d9d;
  }
`;
