import { Collection, WithId } from "mongodb";
import SensorData from "../../types/SensorData";
import mongo from "./db";

const devDB = mongo.db("dev_db");
const devUserCollection = devDB.collection("users");
const sensorDataCollection: Collection<SensorData> = devDB.collection("sensors_data");

export { devUserCollection, sensorDataCollection };
