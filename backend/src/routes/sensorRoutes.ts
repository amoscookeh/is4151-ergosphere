import { Router } from "express";
import {
  getAllSensorData,
  insertSensorData,
  deleteSensorData,
  optimiseLightData,
} from "../services/database/sensor";
import { SensorData } from "../types/Data";

const SensorDataRouter = Router();

SensorDataRouter.get("/:userId", async (req, res) => {
  const allSensorData = await getAllSensorData(req.params.userId);
  if (allSensorData) {
    res.status(200).send(allSensorData);
  } else {
    res.status(404).send("Sensor data not found for this user");
  }
});

SensorDataRouter.post("/", async (req, res) => {
  const newSensorData = {
    hardwareDeviceId: req.body.device_id,
    time: req.body.time,
    lightLevel: req.body.light_level,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
  };
  const sensorData = await insertSensorData(newSensorData as SensorData);
  if (sensorData) {
    res.status(200).send(sensorData);
  } else {
    res.status(404).send("Sensor data failed to insert");
  }
});

SensorDataRouter.post("/optimise_light", async (req, res) => {
  const lightLevel = req.body.light_level;
  const lightLevelClassification = await optimiseLightData(lightLevel);
  if (lightLevelClassification) {
    res.status(200).send({ lightLevelClassification });
  } else {
    res.status(404).send("Light level optimisation failed");
  }
});

SensorDataRouter.delete("/:id", async (req, res) => {
  await deleteSensorData(req.params.id);
  res.status(200).send("Sensor data deleted");
});

export default SensorDataRouter;
