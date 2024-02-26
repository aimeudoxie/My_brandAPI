"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const loginRoute = express_1.default.Router();
// Define the login route
loginRoute.post('/login', loginController_1.default.UserLogin);
exports.default = loginRoute;
