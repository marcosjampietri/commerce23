import { NextApiRequest, NextApiResponse } from "next";
import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  try {
    await connectToMongo();

    const User: any = await user.findById(userId);

    var include = ["name", "email", "activity", "extra", "address", "orders"];
    let filteredUser = Object.assign(
      {},
      ...include.map((omit) => ({ [omit]: User[omit] }))
    );

    // console.log("api do user", User);

    res.send(filteredUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
