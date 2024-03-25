import { MongoClient, ServerApiVersion } from "mongodb";
import getEnv from "../envHandler";

const mongoUri = getEnv("MONGO_URI");
const mongo = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await mongo.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run().catch(console.dir);

export default mongo;
