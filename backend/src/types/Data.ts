interface SensorData {
  hardwareDeviceId: string;
  time: Date;
  lightLevel: number;
  temperature: number;
  humidity: number;
}

interface PostureData {
  hardwareDeviceId: string;
  time: Date;
  postureScore: number;
}

export { SensorData, PostureData };
