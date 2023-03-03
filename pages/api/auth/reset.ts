import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";
import { jwtVerify } from "jose";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToMongo();
    let { password, confirmPassword, token } = req.body;

    const match = password == confirmPassword;
    if (!match) {
      res
        .status(422)
        .json({ status: "error", message: "passwords don't match" });
    }

    const encrypted = async function (password: string) {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    const encryptedPass = await encrypted(password);

    const secret = process.env["JWT_TOKEN_SECRET"];
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const { email } = payload;
    console.log(email);

    const logUser = await user.findOneAndUpdate(
      { email },
      { password: encryptedPass },
      { new: true }
    );
    if (!logUser) {
      res.status(422).json({ status: "error", message: "User doesn't exist" });
    }

    res.status(200).json({ status: "ok", message: "Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
