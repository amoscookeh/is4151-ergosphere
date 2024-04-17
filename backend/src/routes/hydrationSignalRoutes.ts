import { Router } from "express";
import { getAllSensorData } from "../services/database/sensor";

const hydrationSignalRouter = Router();

const base_uri = "http://127.0.0.1:5001/";
const temp_humidity_prediction_uri = base_uri + "api/predict-hydration-time";

hydrationSignalRouter.get("/:userId", async (req, res) => {
    const allSensorData = await getAllSensorData(req.params.userId);
    const humidity = allSensorData.humidity;
    const temp = allSensorData.temperature;
    const timestamp = allSensorData.time;

    const date = new Date(timestamp);
    const hour = date.getHours();
    const dayOfWeek = date.getDay();

    try {
        const response = await fetch(`${temp_humidity_prediction_uri}?hour=${hour}&day_of_week=${dayOfWeek}&temperature=${temp}&humidity=${humidity}`);
        const data = await response.text();  
        console.log('Prediction result:', data);
        res.status(200).send(data)
    } catch (error) {
        console.error('Error during fetch:', error);
        return null;  // Handle the error case appropriately
    }
});

export default hydrationSignalRouter;