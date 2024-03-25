import mongo from "./db";

const sampleDB = mongo.db("test_db");
const sampleCollection = sampleDB.collection("test_collection");

export { sampleDB, sampleCollection };
