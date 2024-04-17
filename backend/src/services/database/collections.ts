<<<<<<< Updated upstream
import mongo from "./db";

const sampleDB = mongo.db("test_db");
const sampleCollection = sampleDB.collection("test_collection");

export { sampleDB, sampleCollection };
=======
import { Collection, WithId } from "mongodb";
import { PostureData, SensorData } from "../../types/Data";
import mongo from "./db";

const devDB = mongo.db("dev_db");
const devUserCollection = devDB.collection("users");
const sensorDataCollection: Collection<SensorData> =
  devDB.collection("sensors_data");
const postureDataCollection: Collection<PostureData> =
  devDB.collection("posture_data");

export { devUserCollection, sensorDataCollection, postureDataCollection };
>>>>>>> Stashed changes
