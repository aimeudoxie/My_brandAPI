import express from "express";

import UserController from "../controllers/userController";
import { authenticateAdmin,authenticateToken } from "../middleware/authMiddleware";

const userRoute=express.Router();

userRoute.get("/users",authenticateToken,authenticateAdmin, UserController.getAllUsers);
userRoute.get("/users/:userId",authenticateToken,authenticateAdmin,UserController.getOneUser);
userRoute.post("/signup",UserController.signup);
userRoute.put("/users/:userId",authenticateToken,authenticateAdmin,UserController.updateUser);
userRoute.delete("/users/:userId",authenticateToken,authenticateAdmin, UserController.deleteUser);

export default userRoute;