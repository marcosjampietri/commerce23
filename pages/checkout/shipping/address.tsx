import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useTypedSelector } from "@/store/index";
import { selectUsers } from "@/store/usersSlicer";
import { selectAddress, setactiveAddress } from "@/store/addressSlicer";
import { review } from "@/store/stepperSlicer";

const ShippingAddress = () => {
  const dispatch = useDispatch();

  const { userInfo } = useTypedSelector(selectUsers);
  const { activeAddress } = useTypedSelector(selectAddress);

  return (
    <>
      <Addresses>
        {userInfo &&
          userInfo.address?.map((item: any, index: number) => (
            <Address
              key={index}
              htmlFor={`#${index}`}
              className={`${activeAddress == index ? "active" : null}`}
            >
              <h4>Receiver: {item.fullname}</h4>
              <h4>Street: ....{item.street}</h4>
              <h4>Code: .....{item.postcode}</h4>
              <h4>City: ......{item.city}</h4>
              <h4>Country: .{item.country}</h4>
              <Select>
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={activeAddress == index}
                  id={`#${index}`}
                  onChange={() => {
                    dispatch(setactiveAddress(index));
                  }}
                  onClick={() => {
                    dispatch(review());
                  }}
                />
                <div>{`${
                  activeAddress == index ? "SELECTED" : "CHANGE TO THIS"
                }`}</div>
              </Select>
            </Address>
          ))}
      </Addresses>
    </>
  );
};

export default ShippingAddress;

const Addresses = styled.div`
  margin: 10px;
  padding-top: 20px;
  height: 60vh;
  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .active {
    transition: 0.01s;
    transform: scale(1.1);
    z-index: 2;
    background: hsla(48, 100%, 50%, 1);

    outline: 2px solid hsla(48, 100%, 40%, 1);
    outline-offset: 8px;
    box-shadow: 1px 1px 15px hsla(0, 0%, 0%, 0.5);
    h4 {
      color: hsla(280, 50%, 15%, 1);
      font-size: 12px;
      margin: 4px 0px;
    }
  }

  // input {
  //      :checked {
  // }}
`;
const Address = styled.label`
  display: block;
  max-width: 260px;
  width: 100%;
  transform: scale(1);
  z-index: 1;
  margin: 5px;
  padding: 10px;
  box-sizing: border-box;

  transition: 0.2s;
  background: hsla(280, 50%, 15%, 1);
  border-radius: 5px;
  box-shadow: 1px 1px 0px black;
  cursor: pointer;

  h4 {
    color: hsla(280, 50%, 85%, 0.5);
    font-size: 12px;
    margin: 4px 0px;
  }
`;
const Select = styled.div`
  margin: 0px 0px;
  padding: 10px;

  border-radius: 5px;
  background: yellow;

  display: flex;
  justify-content: center;

  // input {
  //      :checked {
  // }}

  div {
    margin: 0px 10px;
    fonte-size: 10px;
  }
`;
