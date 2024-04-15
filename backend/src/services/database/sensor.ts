import { ObjectId } from "mongodb";
import SensorData from "../../types/SensorData";
import { sensorDataCollection } from "./collections";
import { getUserById } from "./users";

/* Get all sensor data */
const getAllSensorData = async (userId: string): Promise<SensorData> => {
    let sensorData;
    try {  
      const user = await getUserById(userId);
      if (!user) {
        throw new Error("Login user not found");
      }
      sensorData = (await sensorDataCollection
        .findOne(
          { hardwareDeviceId: user.hardwareDeviceId }, 
          { sort: { timestamp: -1 } }
      )) as unknown as SensorData;
    } catch (error) {
      throw new Error(`Error finding all sensor data: ${error}`);
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

export { getAllSensorData, insertSensorData, deleteSensorData };
  