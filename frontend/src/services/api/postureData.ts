import axios from "axios";
import { baseUrl } from "./index";
import PostureData from "../../types/PostureData";

const api = axios.create({
  baseURL: `${baseUrl}/posture`,
});

export const insertPostureData = (postureData: PostureData): void => {
  api.post(`/`, postureData);
  return;
};

export const fetchAllPostureData = (
  userId: string
): Promise<Array<PostureData>> => {
  const response = api.get(`/${userId}`).then((res) => res.data);
  return response;
};
