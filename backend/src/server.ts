import express from "express";
import { createServer, Server as HTTPServer } from "http";
import WebSocket, { WebSocketServer } from "ws";
import getEnv from "./services/envHandler";
import cors from "cors";
import UserRouter from "./routes/userRoutes";
import SensorDataRouter from "./routes/sensorRoutes";
import PostureDataRouter from "./routes/postureRoutes";
import { connectMqttClient } from "./services/mqtt/mqttClient";
import CommandRouter from "./routes/commandRoutes";

const app = express();
const httpServer: HTTPServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// Middleware
app.use(express.json());
app.use(cors());

// Web Sockets
const clients = new Map();

wss.on("connection", (ws, req: any) => {
  const deviceId = new URL(
    req.url,
    `http://${req.headers.host}`
  ).searchParams.get("device_id");

  if (!deviceId) {
    ws.close(1000, "Device ID is required");
    return;
  }

  // Store the WebSocket connection for this device
  if (!clients.has(deviceId)) {
    clients.set(deviceId, []);
  }
  clients.get(deviceId).push(ws);

  ws.on("message", (message) => {
    broadcast(deviceId, message);
  });

  ws.on("close", () => {
    const connections = clients.get(deviceId);
    if (connections) {
      clients.set(
        deviceId,
        connections.filter((connection: any) => connection !== ws)
      );
      if (connections.length === 0) {
        clients.delete(deviceId);
      }
    }
  });

  ws.on("error", (e) => console.log("WebSocket error: ", e));
});

// Broadcast function to send data to clients connected under a specific device_id
function broadcast(deviceId: any, data: any) {
  const connections = clients.get(deviceId);
  if (connections) {
    connections.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}

// API Routes
const apiRouter = express.Router();
apiRouter.get("/", (req, res) => res.send("ErgoSphere API is running"));
apiRouter.use("/user", UserRouter);
apiRouter.use("/sensor", SensorDataRouter);
apiRouter.use("/posture", PostureDataRouter);
apiRouter.use("/command", CommandRouter);

// MQTT
connectMqttClient();

// Routes
app.get("/", (req, res) => res.send("ErgoSphere Backend is running"));
app.use("/api", apiRouter);

// Start the server
const PORT = getEnv("REACT_APP_BACKEND_PORT") || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
