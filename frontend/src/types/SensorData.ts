interface SensorData {
  _id?: string;
  hardwareDeviceId: string;
  time: string;
  lightLevel: number;
  temperature: number;
  humidity: number;
}

export default SensorData;
