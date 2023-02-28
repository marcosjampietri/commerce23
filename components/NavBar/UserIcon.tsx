import React, { useEffect } from "react";
import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { AppDispatch, useTypedSelector } from "../../store/index";

import { logoutUser, selectUsers } from "@/store/usersSlicer";
import Modal from "./Modal";
import { modOffAction, modOnAction, selectToggle } from "@/store/toggleSlicer";
import { selectload, setSubmitting } from "@/store/loadSlicer";

const UserIcon = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { ModOn } = useTypedSelector(selectToggle);
  const { userInfo } = useTypedSelector(selectUsers);
  const { submitting } = useTypedSelector(selectload);

  const openMod = () => {
    userInfo ? dispatch(modOnAction()) : router.push("/login");
  };

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(setSubmitting(true));
  };

  return (
    <>
      <Log>
        <div>
          <User onClick={openMod}>
            <Icon>
              <BiUser />
            </Icon>
            {userInfo && !submitting && <div>{userInfo.name}</div>}
          </User>
        </div>

        {ModOn && (
          <Modal>
            <UImenu onClick={() => dispatch(modOffAction())}>
              <Profile onClick={() => router.push(`/dashboard`)}>
                PROFILE
              </Profile>
              <LogOut onClick={onLogout}>LOGOUT</LogOut>
            </UImenu>
          </Modal>
        )}
      </Log>
    </>
  );
};

export default UserIcon;

const Log = styled.div`
  position: relative;
  bottom: -3px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const User = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 5px;
  }
`;
const Icon = styled.div`
  width: 35px;
  height: 35px;
  font-size: 40px;

  border-radius: 50%;
  border: 2px solid hsla(0, 0%, 0%, 1);
  background: hsla(0, 0%, 80%, 1);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  svg {
    background: hsla(0, 0%, 100%, 1);
  }
`;
const UImenu = styled.div`
  position: absolute;
  top: 0px;
  width: 150px;

  border-radius: 2px;
  background: hsla(0, 0%, 100%, 1);

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const MenuItem = styled.div`
  width: 90%;
  margin: 4px;
  padding: 4px;
  font-size: 1em;

  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogOut = styled(MenuItem)``;
const Profile = styled(MenuItem)``;