import { connect, set } from "mongoose";

const uri: string = <string>process.env.DATABASE;

connectToMongo().catch((err) => console.log(err));

export async function connectToMongo(): Promise<void> {
  //strict option set to false means that all the fields will be saved in the database, even if some of them are not specified in the schema model.
  await set("strictQuery", true);
  // Connect to MongoDB
  await connect(uri);

  console.log("connected to MongoDB using mongoose 6... yaayy"); // 'bill@initech.com'
}
