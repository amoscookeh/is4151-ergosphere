import axios from "axios";
import { sha256 } from "js-sha256";
import User from "../../types/User";
import { baseUrl } from "./index";

const api = axios.create({
  baseURL: `${baseUrl}/user`,
});

export const getUser = (userId: string): Promise<User> =>
  api.get("/", { data: userId });
export interface LoginUserInterface {
  username: string;
  password: string;
}
export const loginUser = async (
  loginDetails: LoginUserInterface
): Promise<User> => {
  const hashedPassword = sha256(loginDetails.password);
  const response = await api.post("/login", {
    ...loginDetails,
    password: hashedPassword,
  });
  return response.data;
};

export const registerUser = async (user: User): Promise<User> => {
  const hashedPassword = sha256(user.password);
  const response = await api.post("/register", {
    ...user,
    password: hashedPassword,
  });
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const hashedPassword = sha256(user.password);
  const response = await api.put("/update", {
    ...user,
    password: hashedPassword,
  });
  return response.data;
};
export const deleteUser = (userId: string): Promise<boolean> =>
  api.delete("/delete", { data: userId });
