import { NextApiRequest, NextApiResponse } from "next";

import Order from "@/server/models/orderModel";
import User from "@/server/models/userModel";

import { connectToMongo } from "@/server/index";
import { Product as ProductType } from "@/types/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongo();

    let { yourCart, userInfo, deliverAddress } = req.body;

    const itemsPrice =
      yourCart
        .map(
          (product: ProductType): number => product.price * product.quantity!
        )
        .reduce((a: any, b: any) => a + b, 0) * 100;
    const shippingPrice = 100 * 5.99;
    const taxPrice = itemsPrice * 0;
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const newOrder = new Order({
      user: userInfo._id,
      orderItems: [...yourCart],
      deliverAddress,
      paymentMethod: "card",
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
    });
    const { _id } = await newOrder.save();

    await User.findByIdAndUpdate(
      userInfo?._id,
      { $push: { orders: _id } },
      { new: true }
    );

    res.send(_id);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
};

export default handler;
