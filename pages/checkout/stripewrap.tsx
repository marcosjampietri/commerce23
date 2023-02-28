import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment";

const stripePromise = loadStripe(
  "pk_test_51JP5tCEV3aJ0axV3AgECWzYOvcF1T8X4j8FRt6nYeLwwoxgfc9bvRfgATmBu6U0k1XYStmZ43soklcbdGy0LBgD300G4pdBwfD"
);

const Stripe = ({ children }: any) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>{" "}
    </>
  );
};

export default Stripe;
