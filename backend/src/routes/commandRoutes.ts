import { Router } from "express";
import { publishMqttMessage } from "../services/mqtt/mqttClient";
import {
  LightCommandMessageInterface,
  sendLightControlCommand,
} from "../services/lightControl";

const CommandRouter = Router();

CommandRouter.post("/", async (req, res) => {
  try {
    const message: LightCommandMessageInterface = {
      command: req.body.command,
      intensity: req.body.intensity,
      colour: req.body.colour,
    };
    sendLightControlCommand(message);
    res.send("Command sent");
  } catch (err: any) {
    console.error(err);
    res.status(500).send("Failed to send command");
  }
});

export default CommandRouter;
