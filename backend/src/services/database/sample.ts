import { sampleCollection } from "./collections";

const sampleFetch = async () => {
  console.log("Fetching data from database...");
  const output = await sampleCollection.find({}).toArray();
  return output;
};

export { sampleFetch };
