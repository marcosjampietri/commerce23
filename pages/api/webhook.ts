import jwt, { Secret } from "jsonwebtoken";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { connectToMongo } from "../../server";
import user from "../../server/models/userModel";
import type { user as UserType } from "../../server/models/userModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);

    const signingSecret = process.env["STRIPE_SIGNIN_SECRET"] as string;
    const secretKey = process.env["STRIPE_SECRET_KEY"] as string;
    const sig = req.headers["stripe-signature"] as string | Buffer | string[];
    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-11-15",
    });

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, signingSecret);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "invoice.payment_succeeded":
        // Then define and call a function to handle the event payment_intent.succeeded
        const IP = await event.data.object;

        console.log("invoice suceeded", IP);
        await connectToMongo();

        const User: UserType | null = await user.findOne({
          "stripe.id": IP!.customer,
        });
        const secret = <Secret>process.env["JWT_TOKEN_SECRET"];
        const UserID = await User!._id;

        const token = await jwt.sign({ id: UserID }, secret, {
          algorithm: "HS256",
          expiresIn: 60 * 60 * 24 * 1, //one day (um dia)
        });
        // const product = line_items!.data[0].description;
        // const invoice = await stripe.invoices.retrieve(pi.invoice);
        const product = IP.lines.data[0].price!.product;
        // console.log(product);

        const existingProduct =
          User!.stripe.subscriptions.filter((e) => e.name == product).length >
          0;

        if (existingProduct) {
          await user.findByIdAndUpdate(
            User!._id,
            { $set: { "stripe.subscriptions.$[x].access": token } },
            { arrayFilters: [{ "x.name": product }], new: true }
          );
        } else {
          await user.findByIdAndUpdate(User!._id, {
            $push: {
              "stripe.subscriptions": {
                name: product,
                access: token,
              },
            },
          });
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send("tudo certo");
    // Code here
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
