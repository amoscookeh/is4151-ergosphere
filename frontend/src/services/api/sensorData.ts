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
