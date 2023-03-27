import { NextApiRequest, NextApiResponse } from "next";

import Products from "../../../server/models/prodModel";
import { connectToMongo } from "../../../server/index";

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // try {
  //     await connectToMongo()
  //     const data = await products.find()
  //     res.json(data)
  // } catch (err) {
  //     console.log(err)
  //     res.status(500).send("error")
  // }
  try {
    await connectToMongo();

    const page: number = Number(req.query.page) || 0;
    const productsPerPage: number = Number(req.query.perpage) || 10;

    // console.log(req.query);

    const numberOfproducts = await Products.countDocuments();
    const numberOfPages = Math.ceil(numberOfproducts / productsPerPage);

    const products = await Products.find()
      .skip(page * productsPerPage)
      .limit(productsPerPage);

    res.send({ products, numberOfPages });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
