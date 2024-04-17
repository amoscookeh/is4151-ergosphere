import axios from "axios";
import { baseUrl } from "./index";
import SensorData from "../../types/SensorData";

const api = axios.create({
  baseURL: `${baseUrl}/sensor`,
});

export const fetchSensorData = (userId: string): Promise<SensorData> => {
  const response = api.get(`/${userId}`).then((res) => res.data);
  return response;
};

export const fetchLightLevelOptimized = (
  lightLevel: number
): Promise<{ lightLevelClassification: number }> => {
  const response = api
    .post(`/optimise_light`, { light_level: lightLevel })
    .then((res) => res.data);
  return response;
};
