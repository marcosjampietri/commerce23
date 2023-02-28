import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { useTypedSelector } from "@/store/index";
import { ship, pay } from "@/store/stepperSlicer";
import { selectUsers } from "@/store/usersSlicer";

import { selectCart } from "@/store/cartSlicer";
import { BsPencilSquare } from "react-icons/bs";
import { selectAddress } from "@/store/addressSlicer";

const Order = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { yourCart, itemsTotal } = useTypedSelector(selectCart);
  const { userInfo, userLoading } = useTypedSelector(selectUsers);
  const { activeAddress } = useTypedSelector(selectAddress);

  {
    /* const activeAddress = userInfo.address.length - 1; */
  }

  const deliverTo = userInfo?.address[activeAddress];

  return (
    <Section>
      <Button onClick={() => dispatch(pay())}>PROCEED TO PAYMENT</Button>
      <Basket>
        <Row>
          <div style={{ fontWeight: "bold" }}>PURCHASED ITEMS</div>

          <ButtonA onClick={() => router.push("/cart")}>
            <div>Change Items</div>
            <BsPencilSquare />
          </ButtonA>
        </Row>
        <ListOfProducts>
          {yourCart.map((product: any, index: any) => (
            <ProductOnOrder key={index}>
              <h6 className="tt">{product.title}</h6>
              <div className="pr">£{product.price}</div>
              <div className="x"> X {product.quantity}</div>
              <div className="ff">£{product.itemTotal}</div>
            </ProductOnOrder>
          ))}
        </ListOfProducts>
        <Row>
          <div>Items Totals:</div>
          <div>£{itemsTotal}</div>
        </Row>
      </Basket>

      {deliverTo && !userLoading ? (
        <>
          <Deliver>
            <Row>
              <div style={{ fontWeight: "bold" }}>SHIPPING ADDRESS</div>
              <ButtonA onClick={() => dispatch(ship())}>
                <div>Change Address</div>
                <BsPencilSquare />
              </ButtonA>
            </Row>
            <Row>
              <h5>Receiver: </h5>
              <h6>{deliverTo.fullname}</h6>
            </Row>
            <Row>
              <h5>Street: </h5>
              <h6>{deliverTo.street}</h6>
            </Row>
            <Row>
              <h5>Code: </h5>
              <h6>{deliverTo.postcode}</h6>
            </Row>
            <Row>
              <h5>City: </h5>
              <h6>{deliverTo.city}</h6>
            </Row>
            <Row>
              <h5>Country: </h5>
              <h6>{deliverTo.country}</h6>
            </Row>
          </Deliver>
        </>
      ) : (
        <Deliver>
          <Row style={{ justifyContent: "center" }}>Loading Address...</Row>
        </Deliver>
      )}

      <Totals>
        <Row>
          <div>Items Totals:...</div>
          <div>£{itemsTotal}</div>
        </Row>
        <Row>
          <div>Shipping:........</div>
          <div>£5.99</div>
        </Row>
        <Row>
          <div>Tax:.................</div>
          <div>£{itemsTotal * 0.2}</div>
        </Row>
        <Row>
          <h5>TOTAL DUE:</h5>
          <h5>£{itemsTotal}</h5>
        </Row>
      </Totals>
    </Section>
  );
};

export default Order;

const Box = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 10px auto;
  // margin-top: 50px;
  // margin-bottom: 50px;
  padding: 10px;
  border: 1px solid hsla(0, 0%, 0%, 0.05);
  // box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
  // border-radius: 5px;
`;

const Section = styled.section``;

const Button = styled.button`
  width: 100%;
  max-width: 600px;
  height: 35px;
  margin: 10px auto;

  background: hsla(340, 100%, 50%, 1);
  color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ButtonA = styled(Button)`
  width: 50%;
  margin: 0px 20px;
  background: hsla(340, 0%, 50%, 1);
`;

const Basket = styled(Box)``;
const Deliver = styled(Box)`
  // max-width: 300px;
`;

const ListOfProducts = styled.div`
  margin: 0px auto;
  width: 100%;
`;

const ProductOnOrder = styled.div`
  margin: 4px 0px;
  width: 100%;
  height: 30px;

  border-bottom: 1px solid hsla(0, 0%, 83%, 1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  .tt {
    width: 50%;
    min-width: 100px;
    margin: 0px;
  }
  .pr {
    width: 70px;
  }
  .x {
    width: 50px;
  }
  .ff {
    width: 30%;
    min-width: 50px;
    text-align: end;
  }
`;

const Totals = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0px auto;

  border-top: 2px solid red;
`;

const Row = styled.div`
  height: 26px;
  margin: 10px 0px;

  display: flex;
  align-items: center;

  h5 {
    width: 90px;
    font-size: 0.6em;
    text-transform: uppercase;
  }
`;
