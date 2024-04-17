import { ObjectId } from "mongodb";
import { SensorData } from "../../types/Data";
import { sensorDataCollection } from "./collections";
import { getUserById } from "./users";
import { optimiseLight } from "../mqtt/smartLight";

/* Get all sensor data */
const getAllSensorData = async (userId: string): Promise<SensorData> => {
  let sensorData;
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Login user not found");
    }
    sensorData = (await sensorDataCollection.findOne(
      { hardwareDeviceId: user.hardwareDeviceId },
      { sort: { time: -1 } }
    )) as unknown as SensorData;
    optimiseLight(sensorData.lightLevel);
  } catch (error) {
    throw new Error(`Error finding all sensor data: ${error}`);
  }
  return sensorData;
};

/* Insert sensor data */
const insertSensorData = async (
  sensorData: SensorData
): Promise<SensorData> => {
  try {
    await sensorDataCollection.insertOne({ ...sensorData });
    optimiseLight(sensorData.lightLevel);
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
