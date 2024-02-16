import express from "express";

import UserController from "../controllers/userController";

const userRoute=express.Router();

userRoute.get("/users",UserController.getAllUsers);
userRoute.post("/signup",UserController.signup);
userRoute.put("/users/:userId",UserController.updateUser);
userRoute.delete("/users/:userId",UserController.deleteUser);

export default userRoute;