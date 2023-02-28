import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis';
import nodemailer from "nodemailer";

// import { connectToMongo } from "../../../server/index";
// import orders from "../../../server/models/orderModel";

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {

    const { userInfo, yourCart } = req.body

    const { _id, name, email, address, orders, } = userInfo

    //     const { street, postcode } = address[0]
    // 
    const items: string = yourCart.map((item: any, index: number) => {
        return `${index + 1} - ${item.title} X ${item.quantity}<br/>`
    }).toString();

    const clientId = <string>process.env["GMAIL_C_ID"]
    const clientSecret = <string>process.env["GMAIL_C_SECRET"]
    const redUri = 'https://developers.google.com/oauthplayground'
    const refreshToken = <string>process.env["GMAIL_REF_TOKEN"]


    const oAuth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redUri
    );

    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const options: any = {
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'admin@marcosjampietri.co.uk',
                clientId,
                clientSecret,
                refreshToken,
                accessToken,
            },
        }

        const transport = nodemailer.createTransport(options);

        const mailOptions = {
            from: 'Marcos Jampietri <noreply@marcosjampietri.co.uk>',
            to: email,
            subject: `Congrats, ${name} here's you order details`,
            text: `Hello, ${name}`,
            html: `
            <h1>Hello, ${name} </h1>
            <p>thank you very much for your purchase. Your purchase:<br/> ${items}<br/> and is gonna be delivered to: {street}, {postcode} </p>`,
        };

        await transport.sendMail(mailOptions);

        res.send('Email Sent')

    } catch (error) {
        res.send(error)
    }


    // const send = await sendEmail();
    // 
    //   .then((result) => console.log('Email sent...', result))
    //   .catch((error) => console.log(eomessage));


}