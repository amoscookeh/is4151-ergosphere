import express from "express";
import { createServer, Server as HTTPServer } from "http";
import { sampleFetch } from "./services/database/sample";
import getEnv from "./services/envHandler";

const app = express();
const httpServer: HTTPServer = createServer(app);

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("ErgoSphere API is running"));
// Route to test database connection
app.get("/test_db", async (req, res) => res.send(await sampleFetch()));

// Start the server
const PORT = getEnv("REACT_APP_BACKEND_PORT") || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
