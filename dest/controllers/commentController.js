"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
const user_1 = require("../model/user");
const authMiddleware_1 = require("../middleware/authMiddleware");
const comment_1 = require("../model/comment");
class CommentController {
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, authMiddleware_1.authenticateToken)(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    if (!req.user) {
                        return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
                    }
                    const { id } = req.params;
                    const { text, username, userid, createdAt } = req.body;
                    const userId = req.user.id;
                    // Check if the article exists
                    const article = yield article_1.Article.findById(id);
                    if (!article) {
                        return res.status(404).json({ status: 'error', message: 'Article not found' });
                    }
                    // Check if the user exists
                    const user = yield user_1.User.findById(userId);
                    if (!user) {
                        return res.status(404).json({ status: 'error', message: 'User not found' });
                    }
                    if (!user.username) {
                        return res.status(400).json({ status: 'error', message: 'User does not have a username' });
                    }
                    const newComment = yield comment_1.Comment.create({
                        userid: userId,
                        username: user.username,
                        text,
                        createdAt: new Date(),
                    });
                    article.comments.push(newComment);
                    console.log(newComment);
                    const updatedArticle = yield article.save();
                }));
                return res.status(201).json({ status: 'success', message: 'Comment added successfully' });
            }
            catch (error) {
                console.error('Error adding comment:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use authenticateToken middleware to check authorization
                yield (0, authMiddleware_1.authenticateToken)(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    if (!req.user) {
                        return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
                    }
                    const { articleId, commentId } = req.params;
                    const userId = req.user.id;
                    // Check if the article exists
                    const article = yield article_1.Article.findById(articleId);
                    if (!article) {
                        return res.status(404).json({ status: 'error', message: 'Article not found' });
                    }
                    // Check if the comment exists
                    const comment = article.comments.find((c) => c._id.toString() === commentId);
                    if (!comment) {
                        return res.status(404).json({ status: 'error', message: 'Comment not found' });
                    }
                    // Check if the user owns the comment
                    if (comment.userid !== userId) {
                        return res.status(403).json({ status: 'error', message: 'Unauthorized: User does not own the comment' });
                    }
                    // Remove the comment from the array
                    article.comments = article.comments.filter((c) => c._id.toString() !== commentId);
                    // Save the updated article
                    yield article.save();
                }));
                return res.status(200).json({ status: 'success', message: 'Comment deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting comment:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new CommentController();
