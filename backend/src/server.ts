import express from "express";
import { createServer, Server as HTTPServer } from "http";
import getEnv from "./services/envHandler";
import cors from "cors";

import UserRouter from "./routes/userRoutes";
import SensorDataRouter from "./routes/sensorRoutes";

const app = express();
const httpServer: HTTPServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
const apiRouter = express.Router();
apiRouter.get("/", (req, res) => res.send("ErgoSphere API is running"));
apiRouter.use("/user", UserRouter);
apiRouter.use("/sensor", SensorDataRouter);

// Routes
app.get("/", (req, res) => res.send("ErgoSphere Backend is running"));
app.use("/api", apiRouter);

// Start the server
const PORT = getEnv("REACT_APP_BACKEND_PORT") || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
