import mongo from "./db";

const devDB = mongo.db("dev_db");
const devUserCollection = devDB.collection("users");

export { devUserCollection };
