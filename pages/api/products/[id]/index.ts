import { NextApiRequest, NextApiResponse } from "next";

import  products  from "../../../../server/models/prodModel";
import {connectToMongo} from "../../../../server/index"

export default async function getProductById(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const data = await products.findById(req.query._id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}
