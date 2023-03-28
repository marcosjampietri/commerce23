import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../server/models/prodModel";
import { connectToMongo } from "../../../server/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    connectToMongo();
    const category = (req.query.category as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const searchTerm = (req.query.searchTerm as string) || "";
    const productsPerPage: number = Number(req.query.perpage) || 10;
    const skip = (page - 1) * productsPerPage;
    const filter = category
      ? { categories: { $in: [category] } }
      : searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(filter)
      .skip(skip)
      .limit(productsPerPage);
    // .sort({ createdAt: -1 });

    const numberOfproducts = await Product.find(filter)
      // .skip(skip)
      // .limit(productsPerPage)
      .countDocuments(filter);
    const numberOfPages = Math.ceil(numberOfproducts / productsPerPage);

    res.status(200).json({
      success: true,
      products,
      numberOfPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100mb",
//     },
//   },
// };

// Here we are setting up an endpoint for GET requests to "/api/products" with pagination, category and search term filters.
// If category is provided, we'll return products in that category. If searchTerm is provided, we'll return products matching that search term.
// If neither is provided, we'll return all products. We're also calculating the total number of pages based on the number of products returned
// and sending that along with the products to the client.
