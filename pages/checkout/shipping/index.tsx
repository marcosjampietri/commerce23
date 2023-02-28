import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import { selectUsers } from "@/store/usersSlicer";
import { AppDispatch, useTypedSelector } from "@/store/index";
import {
  newAddressOff,
  newAddressOn,
  selectAddress,
  setinputAddress,
} from "@/store/addressSlicer";

// import ShippingAddress from "./address";
// import AddressForm from "./form";
// import LookUpAddress from "./lookup";

const LookUpAddress = dynamic(() => import("./lookup"), {
  suspense: true,
});
const ShippingAddress = dynamic(() => import("./address"), {
  suspense: true,
});
const AddressForm = dynamic(() => import("./form"), {
  suspense: true,
});

const ShippingStep = () => {
  const dispatch: AppDispatch = useDispatch();

  const { userInfo } = useTypedSelector(selectUsers);
  const { inputAddress, newAddress } = useTypedSelector(selectAddress);

  useEffect(() => {
    dispatch(newAddressOn());
  }, []);

  return (
    <>
      <Switch>
        <button
          onClick={() => {
            dispatch(newAddressOn());
            dispatch(setinputAddress(null));
          }}
          className={`${newAddress ? "on" : ""}`}
        >
          ENTER NEW ADDRESS
        </button>
        <button
          onClick={() => dispatch(newAddressOff())}
          className={`${newAddress ? "" : "on"}`}
        >
          CHOOSE ADDRESS FROM LIST
        </button>
      </Switch>
      {!newAddress && userInfo.address?.length > 0 ? (
        <>
          <ShippingAddress />
        </>
      ) : (
        <>{inputAddress ? <AddressForm /> : <LookUpAddress />}</>
      )}
    </>
  );
};

export default ShippingStep;

const Switch = styled.div`
  height: 50px;
  max-width: 500px;
  margin: 10px auto;

  border: none;
  background-image: linear-gradient(white 60%, lightgrey);
  border-radius: 10px;
  box-shadow: 2px 2px 10px hsla(10, 10%, 10%, 0.3);

  button {
    border: 1px solid hsla(10, 10%, 10%, 0.3);
    width: 50%;
    height: 100%;
    background-color: transparent;
    color: #989898;
  }

  button:first-child {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  button:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }

  .on {
    background-image: linear-gradient(white 50%, #96a5d1);
    color: black;
  }
`;
