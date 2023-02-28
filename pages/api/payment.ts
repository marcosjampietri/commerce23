import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { connectToMongo } from "@/server/index";
import orders from "@/server/models/orderModel";

export default async function payment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToMongo();

    const { orderId: _id } = await req.body;

    const orderFound = await orders.findById(_id);

    const amount = orderFound!.totalPrice;

    const secretKey = <string>process.env["STRIPE_SECRET_KEY"];

    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-11-15",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
    });

    res.status(200).send(paymentIntent.client_secret);
    // ====== //
  } catch (err) {
    console.log(err);
    res.status(500).send("payment end point failed");
  }
}
