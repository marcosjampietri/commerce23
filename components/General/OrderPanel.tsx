import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { animated, useTransition, config } from "react-spring";
import { FiX } from "react-icons/fi";

import useOutClick from "../Hooks/useOutClick";
import { cartOffAction, selectToggle } from "@/store/toggleSlicer";
import { selectCart } from "@/store/cartSlicer";
import { useTypedSelector } from "@/store";
import { selectUsers } from "@/store/usersSlicer";

const OrderPanel = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useOutClick(ref, cartOffAction);

  const { yourCart, itemsTotal } = useTypedSelector(selectCart);
  const { userInfo } = useTypedSelector(selectUsers);
  const { CartOn } = useTypedSelector(selectToggle);

  let deliverTo: any = null;

  if (userInfo && userInfo.address?.length > 0) {
    const activeAddress = userInfo?.address?.length - 1;
    deliverTo = userInfo?.address[activeAddress];
  }

  const toggleCart = useTransition(CartOn, {
    from: { opacity: 0.3, right: "-30vw" },
    enter: { opacity: 1, right: "0.5vw" },
    leave: { opacity: 0, right: "-30vw" },
    // reverse: CartOn,
    delay: 0,
    config: config.slow,
  });

  return (
    <>
      {toggleCart((styles, item) =>
        item ? (
          <Panel style={styles} ref={ref}>
            <TTI>
              <Cross onClick={() => dispatch(cartOffAction())}>
                <FiX />
              </Cross>
            </TTI>

            <Basket>
              <ListOfProducts>
                {yourCart.map((product: any, index: any) => (
                  <ProductOnOrder key={index}>
                    <h6 className="tt">{product.title}</h6>
                    <div className="pr">£{product.price}</div>
                    <div className="x">X {product.quantity}</div>
                    <div className="ff">£{product.itemTotal}</div>
                  </ProductOnOrder>
                ))}
              </ListOfProducts>
            </Basket>

            {deliverTo && (
              <>
                <div>Shipping Address</div>
                <Deliver>
                  <Row>
                    <h6>Receiver: </h6>
                    <h6>{deliverTo.fullname}</h6>
                  </Row>
                  <Row>
                    <h6>Street: </h6>
                    <h6>{deliverTo.street}</h6>
                  </Row>
                  <Row>
                    <h6>Code: </h6>
                    <h6>{deliverTo.postcode}</h6>
                  </Row>
                  <Row>
                    <h6>City: </h6>
                    <h6>{deliverTo.city}</h6>
                  </Row>
                  <Row>
                    <h6>Country: </h6>
                    <h6>{deliverTo.country}</h6>
                  </Row>
                </Deliver>
              </>
            )}
            <Totals>
              {deliverTo && (
                <>
                  <Row>
                    <div>Items Totals:</div>
                    <div>£{itemsTotal}</div>
                  </Row>
                  <Row>
                    <div>Shipping</div>
                    <div>£5.99</div>
                  </Row>
                </>
              )}

              <Row>
                <h5>BASKET TOTAL:</h5>
                <h5>£{itemsTotal}</h5>
              </Row>
            </Totals>
            <Link
              href="/checkout"
              onClick={() => {
                const timeout = setTimeout(() => {
                  dispatch(cartOffAction());
                }, 500);
                return () => clearTimeout(timeout);
              }}
            >
              <Pay>GO TO CHECKOUT</Pay>
            </Link>
            {/* <form onSubmit={() => "clicked"}>
                            <Coupon type="text" id="coupon" />
                            <Pay type="submit">APPLY COUPON</Pay>
                        </form> */}
            <View>
              <Link href="/cart" onClick={() => dispatch(cartOffAction())}>
                <ViewBask>VIEW CART</ViewBask>
              </Link>
            </View>
          </Panel>
        ) : (
          <div></div>
        )
      )}
    </>
  );
};

export default OrderPanel;

const Panel = styled(animated.div)`
  position: fixed;
  top: 0.5vw;
  right: -100vw;
  width: 80vw;
  max-width: 500px;
  height: 90vh;
  padding: 10px;

  background: white;
  box-shadow: -5px -5px 35px hsla(240, 50%, 0%, 0.5);
  border-radius: 5px;

  z-index: 15;

  display: flex;
  flex-direction: column;
`;

const TTI = styled.div`
  height: 50px;
  padding: 12px;
`;

const Box = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0px auto;
  // margin-top: 50px;
  // margin-bottom: 50px;
  padding: 10px;
  border: 1px solid hsla(0, 0%, 0%, 0.05);
  // box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
  // border-radius: 5px;
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
  margin: 0px 0px 10px;
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
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  margin: 10px 0px;

  display: flex;
  justify-content: space-between;

  h5 {
    font-weight: bold;
    font-size: 16px;
    margin: 0px;
  }
`;

const Cross = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 50px;

  cursor: pointer;
  background: white;
  border-radius: 50%;
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2em;
  }
`;

const Button = styled.div`
  width: 80%;
  height: 50px;
  margin: 20px auto;

  border: 1px solid black;
  text-transform: uppercase;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewBask = styled.div`
  width: 75vw;
  max-width: 480px;
  padding: 15px;

  background: hsla(0, 0%, 70%, 1);
  color: white;
  border-radius: 5px;
  font-size: 13px;

  display: grid;
  place-items: center;
`;

const Pay = styled.button`
  position: relative;

  margin: 10px auto;
  width: 100%;
  max-width: 300px;
  height: 50px;

  background-color: hsla(340, 90%, 50%, 1);
  color: white;
  border: none;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Coupon = styled.input`
  position: relative;

  margin: 10px auto;
  width: 100%;
  max-width: 300px;
  height: 50px;

  background-color: hsla(340, 90%, 50%, 0);
  color: white;
  border: none;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const View = styled.div`
  width: 100%;

  height: 100%;

  background-color: hsla(340, 90%, 50%, 0);

  display: flex;
  justify-content: center;
  align-items: end;
`;
