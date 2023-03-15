import { NextApiRequest, NextApiResponse } from "next";
const Mongoose = require("mongoose");
import Product from "@/server/models/prodModel";
import { connectToMongo } from "@/server/index";
import { Product as ProductType } from "@/types/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongo();

    let { yourCart } = req.body;

    let bulkArr: any = [];

    // for (const i of yourCart) {
    //   bulkArr.push({
    //     updateOne: {
    //       filter: { _id: Mongoose.Types.ObjectId(i._id) },
    //       update: { $inc: { stock: -i.quantity } },
    //     },
    //   });
    // }

    await yourCart.map((item: ProductType) => {
      bulkArr.push({
        updateOne: {
          filter: { _id: Mongoose.Types.ObjectId(item._id) },
          update: { $inc: { stock: -item.quantity! } },
        },
      });
    });

    Product.bulkWrite(bulkArr);

    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
};

export default handler;
