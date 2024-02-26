"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const articleController_1 = __importDefault(require("../controllers/articleController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const ArticleRoute = express_1.default.Router();
ArticleRoute.get('/articles', articleController_1.default.getAllArticles);
ArticleRoute.get('/articles/:id', articleController_1.default.getOneArticle);
ArticleRoute.post('/create', authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, uploadMiddleware_1.upload.single('image'), articleController_1.default.createArticle);
ArticleRoute.put('/articles/:id', authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, uploadMiddleware_1.upload.single('image'), articleController_1.default.updateArticle);
ArticleRoute.delete('/articles/:id', authMiddleware_1.authenticateToken, authMiddleware_1.authenticateAdmin, articleController_1.default.deleteArticle);
//ArticleRoute.delete('/deletecomment/:articleId/:commentId', commentController.deleteComment);
exports.default = ArticleRoute;
