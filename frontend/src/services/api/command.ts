import axios from "axios";
import { baseUrl } from "./index";

const api = axios.create({
  baseURL: `${baseUrl}/command`,
});

export const adjustBrightness = (brightness: number) =>
  api.post("/", { command: "intensity", intensity: brightness });

export const changeColor = (color: string) =>
  api.post("/", { command: "colour", colour: color });
