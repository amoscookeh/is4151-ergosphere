import { Router } from "express";
import { PostureData } from "../types/Data";
import {
  deletePostureData,
  getAllPostureData,
  getOnePostureData,
  insertPostureData,
} from "../services/database/posture";

const PostureDataRouter = Router();

PostureDataRouter.get("/:userId", async (req, res) => {
  const allPostureData = await getAllPostureData(req.params.userId);
  if (allPostureData) {
    res.status(200).send(allPostureData);
  } else {
    res.status(404).send("Sensor data not found for this user");
  }
});

PostureDataRouter.get("/latest/:userId", async (req, res) => {
  const allPostureData = await getOnePostureData(req.params.userId);
  if (allPostureData) {
    res.status(200).send(allPostureData);
  } else {
    res.status(404).send("Sensor data not found for this user");
  }
});

PostureDataRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newPostureData = {
    hardwareDeviceId: req.body.device_id,
    time: req.body.time,
    postureScore: req.body.postureScore,
  };
  const sensorData = await insertPostureData(newPostureData as PostureData);
  if (sensorData) {
    res.status(200).send(sensorData);
  } else {
    res.status(404).send("Sensor data failed to insert");
  }
});

PostureDataRouter.delete("/:id", async (req, res) => {
  await deletePostureData(req.params.id);
  res.status(200).send("Sensor data deleted");
});

export default PostureDataRouter;
