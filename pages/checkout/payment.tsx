import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useTypedSelector } from "@/store/index";
import { selectCart, clearCart } from "@/store/cartSlicer";
import { selectUsers } from "@/store/usersSlicer";
import Loader from "@/components/General/Loader";
import { WrapLoader } from "../_app";

const elemOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PaymentForm = () => {
  const router = useRouter();

  const { yourCart, itemsTotal } = useTypedSelector(selectCart);
  const { userInfo } = useTypedSelector(selectUsers);

  const [paying, setpaying] = useState(false);
  const [progress, setprogress] = useState("");

  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      //create order
      setprogress("creatin order");
      const { data: orderId } = await axios.post("/api/order", {
        yourCart,
        userInfo,
      });
      //pay
      setprogress("making request");
      const { data: clientSecret } = await axios.post("/api/payment", {
        orderId,
      });
      const cardElement = elements!.getElement(CardNumberElement);

      setprogress("creating payment method");
      const paymentMethodReq = await stripe!.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: { name: "MG Costumer" },
      });
      setprogress("connecting to your bank");
      const { error } = await stripe!.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod!.id,
      });

      //TODO Send Error messages

      if (error) {
        console.log("[error]", error);
        alert("something went wrong");
      } else {
        const { data } = await axios.post("/api/email/confirmorder", {
          userInfo,
          yourCart,
        });

        console.log(data);

        dispatch(clearCart());
        router.push("/checkout/success");
      }
    } catch (err) {
      console.log(err);
      setpaying(false);
      alert(`something went wrong with your payment`);
    }
  };

  return (
    <>
      {paying ? (
        <>
          <WrapLoader>
            <Loader />
            {progress}
          </WrapLoader>
        </>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Icons>
          <img src="/card/visa.svg" alt="visa card icon" />
          <img src="/card/master.svg" alt="master card icon" />
          <img src="/card/amex.svg" alt="amex card icon" />
          <div>£ {itemsTotal}</div>
        </Icons>
        <Label htmlFor="name">Full Name</Label>
        <Name
          id="name"
          placeholder="João Ninguém"
          style={{ mixBlendMode: "initial" }}
        />

        <Label htmlFor="cardNumber">
          Card Number <span>(use: 4242 4242 4242 4242)</span>
        </Label>
        <CardNumberElementStyled id="cardNumber" options={elemOptions} />

        <div>
          <div>
            <Label htmlFor="expiry">
              EXP <span>(use 12/33)</span>
            </Label>
            <CardExpiryElementStyled id="expiry" options={elemOptions} />
          </div>

          <div>
            <Label htmlFor="cvc">
              CVC <span>(use 123)</span>
            </Label>
            <CardCvcElementStyled id="cvc" options={elemOptions} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!stripe}
          onClick={() => setpaying(true)}
        >
          PAY
        </Button>
      </Form>
    </>
  );
};

export default PaymentForm;

const Form = styled.form`
  position: relative;
  max-width: 600px;
  margin: 10px auto;
  margin-bottom: 50px;
  padding: 20px;

  background: white;
  box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    width: 100%;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: space-between;
    }
  }
`;

const Label = styled.label`
  padding: 24px 0px 4px 2px;

  align-self: start;

  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: 100;
  color: #404040;

  span {
    color: #a3a3a3;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 600px;
  height: 50px;
  margin: 20px auto;

  background: hsla(340, 100%, 50%, 1);
  background-image: linear-gradient(
    hsla(335, 100%, 50%, 1),
    hsla(345, 100%, 50%, 1)
  );
  box-shadow: 1px -1px 4px hsla(240, 50%, 0%, 0.3);
  border-radius: 5px;
  border: none;
  color: white;
`;

const Name = styled.input`
  width: 100%;

  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;

  font-size: 18px;

  letter-spacing: 0.025em;
  ::placeholder {
    color: #aab7c4;
  }
  :focus {
    border-color: hsla(10, 85%, 51%, 1);
  }
`;

const CardNumberElementStyled = styled(CardNumberElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;

  :focus {
    color: hsla(10, 85%, 51%, 1);
  }
`;

const CardExpiryElementStyled = styled(CardExpiryElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 5px;
`;

const CardCvcElementStyled = styled(CardCvcElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  padding: 5px;
`;

const Icons = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: start;

  img {
    width: 40px;
    height: 26px;
    margin: 5px;

    border: 1px solid whitesmoke;
    border-radius: 3px;
  }
  div {
    width: 100%;
    text-align: end;
    color: hsla(340, 100%, 50%, 1);
    font-size: 20px;
    font-family: Montserrat;
    font-weight: 700;
  }
`;
