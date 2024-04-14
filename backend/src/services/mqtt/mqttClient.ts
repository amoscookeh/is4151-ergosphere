import mqtt, { MqttClient } from "mqtt";
import { randomInt } from "crypto";

const brokerUrl = "broker.emqx.io";
const port = 1883;
const topic = "/ergoSphere";
const username = "emqx";
const password = "public";

let client: MqttClient;

export function connectMqttClient(): void {
  const clientId = `python-mqtt-${randomInt(0, 10000)}`;
  console.log("client_id =", clientId);

  client = mqtt.connect(`mqtt://${brokerUrl}:${port}`, {
    clientId,
    username,
    password,
  });

  client.on("connect", () => {
    console.log("Connected to MQTT Broker!");
  });

  client.on("error", (err) => {
    console.error("Failed to connect to MQTT Broker:", err);
  });
}

export function publishMqttMessage(message: string): void {
  if (client && client.connected) {
    client.publish(topic, message, (err, packet) => {
      if (err) {
        console.error("Failed to publish message:", err);
      } else {
        console.log(`Sent "${message}" to topic ${topic}`);
      }
    });
  } else {
    console.error("MQTT client is not connected.");
  }
}
