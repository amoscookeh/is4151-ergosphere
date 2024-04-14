import { ObjectId } from "mongodb";
import SensorData from "../../types/SensorData";
import { sensorDataCollection } from "./collections";

/* Get all sensor data */
const getAllSensorData = async (): Promise<SensorData[]> => {
    let allSensorData;
    try {  
        allSensorData = (await sensorDataCollection.find().toArray()) as unknown as SensorData[];
    } catch (error) {
      throw new Error(`Error finding all sensor data: ${error}`);
    }
    return allSensorData;
};

/* Get sensor data by sensorDataId */
const getSensorDataById = async (id: string): Promise<SensorData | undefined> => {
    let sensorData;
    try {
      sensorData = (await sensorDataCollection.findOne({
        _id: new ObjectId(id),
      })) as unknown as SensorData;
    } catch (error) {
      throw new Error(`Error finding sensor data: ${error}`);
    }
    return sensorData;
};

/* Insert sensor data */
const insertSensorData = async (sensorData: SensorData): Promise<SensorData> => {
    try {
        await sensorDataCollection.insertOne({ ...sensorData });
    } catch (error) {
      throw new Error(`Error inserting sensor data: ${error}`);
    }
    return sensorData;
};
  
/* Delete sensor data */
const deleteSensorData = async (sensorId: string): Promise<boolean> => {
try {
    await sensorDataCollection.deleteOne({ _id: new ObjectId(sensorId) });
} catch (error) {
    throw new Error(`Error deleting user: ${error}`);
}
return true;
};

export { getAllSensorData, getSensorDataById, insertSensorData, deleteSensorData };
  