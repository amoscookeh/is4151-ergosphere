import { publishMqttMessage } from "./mqtt/mqttClient";

export interface LightCommandMessageInterface {
  command: string;
  intensity?: number;
  colour?: string;
}

export const sendLightControlCommand = (
  message: LightCommandMessageInterface
) => {
  publishMqttMessage(JSON.stringify(message));
};
