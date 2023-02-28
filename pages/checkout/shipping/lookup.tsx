import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import styled, { keyframes } from "styled-components";

import AddressSearch from "react-loqate";
import { AppDispatch, useTypedSelector } from "@/store";
import { selectUsers } from "@/store/usersSlicer";
import {
  selectAddress,
  seteditSubmission,
  setinputAddress,
} from "@/store/addressSlicer";

type Inputs = {
  fullname: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
};

interface inputAddressType {
  fullname?: string;
  Line1?: string;
  Line2?: string;
  Line3?: string;
  City?: string;
  PostalCode?: string;
  CountryName?: string;
}

const LookUpAddress = () => {
  const dispatch: AppDispatch = useDispatch();
  const loqate = process.env["NEXT_PUBLIC_LOQATE"]!;

  const { userInfo } = useTypedSelector(selectUsers);
  const { inputAddress } = useTypedSelector(selectAddress);

  console.log(inputAddress);

  // useEffect(() => {
  //   if (userInfo?.addresses?.length > 0) setinputAddress(false);
  // }, [userInfo]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const AddressSearchInput = (props: any): JSX.Element => {
    return (
      <InputAdd
        placeholder={"start typing your address or postcode"}
        autoComplete="chrome-off"
        {...props}
      />
    );
  };

  return (
    <AddWrap>
      <AddressSearch
        locale="en_GB"
        apiKey={loqate}
        countries={["GB"]}
        components={{ Input: AddressSearchInput }}
        onSelect={(address) => {
          reset();
          dispatch(setinputAddress(address));
          dispatch(seteditSubmission(true));
        }}
        inline
        debounce={100}
      />
    </AddWrap>
  );
};

export default LookUpAddress;

const AddWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin: 0px auto;

  ul {
    position: absolute;
    left: 0px !important;
    top: 70px !important;
    width: 100% !important;
    height: 350px;
    max-height: 70vh;
    max-height: 50vh;
    padding: 10px;
    overflow: scroll;
    z-index: 12;

    background: white !important;

    border-radius: 4px;
    box-shadow: 2px 2px 15px hsla(0, 0%, 0%, 0.3);
    list-style: none;

    li {
      padding: 5px 2px;
      margin: 0px 2px 15px;
      border-bottom: 1px solid hsla(0, 0%, 30%, 1);
      text-transform: uppercase;

      transition: 0.3s;
      :hover {
        transition: 0.05s;
        background: hsla(0, 0%, 30%, 1);
        color: white;
      }
    }
  }
`;

export const InputAdd = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 5px;

  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid hsla(200, 100%, 0%, 1);
  border-radius: 5px;
  background-color: hsla(0, 0%, 0%, 1);
  backdrop-filter: blur(15px);
  color: hsla(0, 0%, 80%, 1);
  box-shadow: inset 2px 2px 5px hsla(0, 0%, 0%, 0.15);

  transition: 0.5s;

  ::placeholder {
    transition: 0.3s;
    color: hsla(240, 0%, 95%, 1);
    font-size: 16px;
    font-weight: 100;
    text-align: center;
  }

  :focus {
    transition: 0.3s;
    // padding: 0px 60px;
    padding-top: 4px;
    padding-left: -35vw;

    outline: none;
    background: hsla(36, 30%, 100%, 1);
    border: 1px solid hsla(200, 100%, 50%, 1);
    color: hsla(0, 0%, 30%, 1);
    ::placeholder {
      transition: 0.3s;
      color: hsla(240, 0%, 30%, 0.2);
    }
  }
`;
