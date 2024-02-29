"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const commentRoute = express_1.default.Router();
commentRoute.post('/addcomment/:id', commentController_1.default.addComment);
commentRoute.delete('/deletecomment/:articleId/:commentId', commentController_1.default.deleteComment);
exports.default = commentRoute;
