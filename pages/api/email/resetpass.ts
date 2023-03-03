import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import jwt, { Secret } from "jsonwebtoken";

// import { connectToMongo } from "../../../server/index";
// import orders from "../../../server/models/orderModel";

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const secret = <Secret>process.env["JWT_TOKEN_SECRET"];

  const token = jwt.sign({ email }, secret, {
    algorithm: "HS256",
    expiresIn: 60 * 15 * 1 * 1,
    // expiresIn: 10,
  });

  const url =
    process.env["NODE_ENV"] === "development" ? "http://localhost:3000" : "";
  const productsUrl = () => `${url}/profile/reset?token=${token}`;

  const link = productsUrl();

  const clientId = <string>process.env["GMAIL_C_ID"];
  const clientSecret = <string>process.env["GMAIL_C_SECRET"];
  const redUri = "https://developers.google.com/oauthplayground";
  const refreshToken = <string>process.env["GMAIL_REF_TOKEN"];

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redUri);

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const options: any = {
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: "admin@marcosjampietri.co.uk",
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    };

    const transport = nodemailer.createTransport(options);

    const mailOptions = {
      from: "Marcos Jampietri <noreply@marcosjampietri.co.uk>",
      to: email,
      subject: `Reset your password`,
      text: ``,
      html: `
            <p>Please use this link to reset your password</p>
            <a href="${link}">${link}</a>
            `,
    };

    await transport.sendMail(mailOptions);

    res.send("Email Sent");
  } catch (error) {
    res.send(error);
  }

  // const send = await sendEmail();
  //
  //   .then((result) => console.log('Email sent...', result))
  //   .catch((error) => console.log(eomessage));
}
