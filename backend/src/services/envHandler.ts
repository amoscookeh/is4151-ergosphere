import dotenv from "dotenv";
import path from "path";

// Point .env to to root env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export default getEnv;
