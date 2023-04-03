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
  const hasAdress = userInfo!.address.length > 0;

  console.log(inputAddress);

  useEffect(() => {
    hasAdress ? dispatch(newAddressOff()) : dispatch(newAddressOn());
  }, [hasAdress]);

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
          onClick={() =>
            userInfo!.address?.length > 0 && dispatch(newAddressOff())
          }
          className={`${newAddress ? "" : "on"}`}
        >
          CHOOSE FROM LIST
        </button>
      </Switch>
      {!newAddress && userInfo!.address?.length > 0 ? (
        <>
          <ShippingAddress />
        </>
      ) : (
        <>
          {inputAddress ? (
            <>
              {/* <Button onClick={() => dispatch(setinputAddress(null))}>
                USE ADDRES LOOKUP
              </Button> */}
              <AddressForm />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LookUpAddress /> OR{" "}
              <Button
                onClick={() =>
                  dispatch(
                    setinputAddress({
                      Line1: "",
                      Line2: "",
                      Line3: "",
                      City: "",
                      PostalCode: "",
                      CountryName: "",
                    })
                  )
                }
              >
                ENTER MANUALLY
              </Button>
            </div>
          )}
        </>
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
    transition: 0.5s;
    border: 2px solid hsla(10, 10%, 70%, 0.3);
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
    transition: 0.1s;
    background-image: linear-gradient(white 50%, hsla(240, 50%, 80%, 1));
    color: hsla(260, 100%, 50%, 1);
    border: 2px solid hsla(260, 100%, 50%, 1);
  }
`;

const Button = styled.button`
  width: 90vw;
  max-width: 580px;
  height: 40px;
  margin: 10px auto;

  background: hsla(340, 100%, 0%, 1);
  color: white;
  font-size: 16px;
  border-radius: 5px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
