import { ObjectId } from "mongodb";
import User from "../../types/User";
import { devUserCollection } from "./collections";

/* Get a user by userId */
const getUserById = async (id: string): Promise<User | undefined> => {
  let user;
  try {
    user = (await devUserCollection.findOne({
      _id: new ObjectId(id),
    })) as unknown as User;
  } catch (error) {
    throw new Error(`Error finding user: ${error}`);
  }
  return user;
};

/* Get a user by username */
const getUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  let user;
  try {
    user = (await devUserCollection.findOne({ username })) as unknown as User;
  } catch (error) {
    throw new Error(`Error finding user: ${error}`);
  }
  return user;
};

/* Register a new user */
const registerUser = async (user: User): Promise<User> => {
  try {
    await devUserCollection.insertOne({ ...user });
  } catch (error) {
    throw new Error(`Error inserting user: ${error}`);
  }
  return user;
};

/* Update a user */
const updateUser = async (user: User): Promise<User> => {
  try {
    await devUserCollection.updateOne(
      { username: user.username },
      { $set: user }
    );
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
  return user;
};

/* Delete a user */
const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await devUserCollection.deleteOne({ _id: new ObjectId(userId) });
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
  return true;
};

export { getUserById, getUserByUsername, registerUser, updateUser, deleteUser };
