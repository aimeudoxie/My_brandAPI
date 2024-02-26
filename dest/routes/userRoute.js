"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRoute = express_1.default.Router();
userRoute.get("/users", authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, userController_1.default.getAllUsers);
userRoute.post("/signup", userController_1.default.signup);
userRoute.put("/users/:userId", authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, userController_1.default.updateUser);
userRoute.delete("/users/:userId", authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, userController_1.default.deleteUser);
exports.default = userRoute;
