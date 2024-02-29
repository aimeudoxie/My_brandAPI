"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const messageRoute = express_1.default.Router();
messageRoute.post('/sendmessage', authMiddleware_1.authenticateToken, messageController_1.default.createMessage);
messageRoute.get('/read', authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, messageController_1.default.getAllMessages);
exports.default = messageRoute;
