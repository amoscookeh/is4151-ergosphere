import { ObjectId } from "mongodb";
import { PostureData } from "../../types/Data";
import { postureDataCollection } from "./collections";
import { getUserById } from "./users";

/* Get all posture data */
const getAllPostureData = async (
  userId: string
): Promise<Array<PostureData>> => {
  let postureData;
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Login user not found");
    }
    postureData = postureDataCollection
      .find({ hardwareDeviceId: user.hardwareDeviceId }, { sort: { time: -1 } })
      .map((doc: PostureData) => {
        return doc;
      }) as unknown as Array<PostureData>;
  } catch (error) {
    throw new Error(`Error finding all sensor data: ${error}`);
  }
  return postureData;
};

/* Get latest posture data */
const getOnePostureData = async (userId: string): Promise<PostureData> => {
  let postureData;
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Login user not found");
    }
    postureData = (await postureDataCollection.findOne(
      { hardwareDeviceId: user.hardwareDeviceId },
      { sort: { time: -1 } }
    )) as unknown as PostureData;
  } catch (error) {
    throw new Error(`Error finding all sensor data: ${error}`);
  }
  return postureData;
};

/* Insert posture data */
const insertPostureData = async (
  postureData: PostureData
): Promise<PostureData> => {
  try {
    await postureDataCollection.insertOne({ ...postureData });
  } catch (error) {
    throw new Error(`Error inserting sensor data: ${error}`);
  }
  return postureData;
};

/* Delete posture data */
const deletePostureData = async (postureId: string): Promise<boolean> => {
  try {
    await postureDataCollection.deleteOne({ _id: new ObjectId(postureId) });
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
  return true;
};

export {
  getAllPostureData,
  getOnePostureData,
  insertPostureData,
  deletePostureData,
};
