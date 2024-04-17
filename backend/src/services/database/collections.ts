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
