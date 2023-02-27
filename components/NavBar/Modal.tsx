import React, { useRef } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import useOutClick from "../Hooks/useOutClick";
import { modOffAction } from "@/store/toggleSlicer";

const Modal = ({ children }: any) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useOutClick(ref, modOffAction);

  return (
    <ModalSt ref={ref} onClick={() => dispatch(modOffAction())}>
      {children}
    </ModalSt>
  );
};

export default Modal;

const ModalSt = styled.div`
  position: fixed;

  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`;
