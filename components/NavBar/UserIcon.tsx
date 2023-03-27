import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  AiOutlineUser,
  AiOutlineProfile,
  AiOutlineLogout,
  AiOutlineGift,
} from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { AppDispatch, useTypedSelector } from "../../store/index";

import { logoutUser, selectUsers } from "@/store/usersSlicer";
import Modal from "./Modal";
import { modOffAction, modOnAction, selectToggle } from "@/store/toggleSlicer";
import { selectload, setSubmitting } from "@/store/loadSlicer";
import { below } from "@/styles/breakpoints";

const UserIcon = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { ModOn } = useTypedSelector(selectToggle);
  const { userInfo } = useTypedSelector(selectUsers);
  const { submitting } = useTypedSelector(selectload);

  const uName = userInfo && userInfo!.name.split(" ")[0];

  const modItems = [
    {
      name: "Profile",
      icon: <AiOutlineProfile />,
      click: () => router.push(`/dashboard`),
    },
    {
      name: "My Orders",
      icon: <AiOutlineGift />,
      click: () => router.push(`/dashboard`),
    },
    {
      name: "Settings",
      icon: <BsGear />,
      click: () => router.push(`/dashboard`),
    },
    {
      name: "Logout",
      icon: <AiOutlineLogout />,
      click: () => {
        dispatch(logoutUser());
        dispatch(setSubmitting(true));
      },
    },
  ];

  return (
    <Log>
      <User
        onClick={() => {
          userInfo ? dispatch(modOnAction()) : router.push("/login");
        }}
        className={`${ModOn ? "on" : ""}`}
      >
        {userInfo && !submitting && <div className="name">{uName}</div>}
        <Icon>
          <AiOutlineUser />
        </Icon>

        {ModOn && (
          <Modal>
            <UImenu>
              {modItems.map((item, index) => (
                <MenuItem key={index} onClick={item.click}>
                  {item.icon}
                  {item.name}
                </MenuItem>
              ))}
            </UImenu>
          </Modal>
        )}
      </User>
    </Log>
  );
};

export default UserIcon;

const Log = styled.div`
  position: relative;
  top: 2px;
  margin: 0px 2vw;

  display: flex;
  justify-content: center;
  align-items: center;

  .on {
    transition: 0.05s;
    border: 1px solid hsla(0, 0%, 90%, 1);
    background: hsla(0, 0%, 95%, 1);
  }
  .name {
    margin: 0px 5px;
    ${below.med`display: none;`}
  }
`;
const User = styled.div`
  position: relative;
  cursor: pointer;

  transition: 0.3s;
  border-radius: 5px;
  border: 1px solid hsla(0, 0%, 90%, 0);

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  width: 35px;
  height: 35px;
  font-size: 40px;
  margin: 0px;

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
  top: 20px;
  width: 150px;
  padding-bottom: 10px;

  border: 1px solid hsla(0, 0%, 90%, 1);
  border-radius: 5px;
  background: hsla(0, 0%, 100%, 1);

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  svg {
    width: 35px;
  }
  div:last-child {
    margin-top: 20px;
  }
`;
const MenuItem = styled.div`
  width: 90%;
  padding: 10px 0%;

  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
  cursor: pointer;

  transition: 0.3s;
  :hover {
    width: 100%;
    padding: 10px 5%;
    transition: 0.05s;
    background: hsla(0, 0%, 95%, 1);
  }

  display: flex;
  justify-content: start;
  align-items: center;
`;
