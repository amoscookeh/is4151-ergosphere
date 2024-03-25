import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUserByUsername,
  registerUser,
  updateUser,
} from "../services/database/users";
import User from "../types/User";

const UserRouter = Router();

UserRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

UserRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userWithUsername = await getUserByUsername(username);
  if (!userWithUsername) {
    res.status(404).send("User not found");
    return;
  }
  if (userWithUsername.password !== password) {
    res.status(401).send("Incorrect password");
    return;
  }
  res.status(200).send(userWithUsername);
});

UserRouter.post("/register", async (req, res) => {
  const user = req.body;
  const userWithUsername = await getUserByUsername(user.username);
  if (userWithUsername) {
    res.status(409).send(`User already exists`);
    return;
  }
  const newUser = await registerUser(user as User);
  res.status(200).send(newUser);
});

UserRouter.put("/update", async (req, res) => {
  // Handle user update
  const user = req.body;
  const udpatedUser = await updateUser(user as User);
  res.status(200).send(udpatedUser);
});

UserRouter.delete("/delete", async (req, res) => {
  // Handle user deletion
  await deleteUser(req.body.userId);
  res.status(200).send("User deleted");
});

export default UserRouter;
