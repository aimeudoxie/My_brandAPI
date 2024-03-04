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
const comment_1 = require("../model/comment");
const authMiddleware_1 = require("../middleware/authMiddleware");
class CommentController {
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, authMiddleware_1.authenticateToken)(req, res, () => __awaiter(this, void 0, void 0, function* () {
                        if (!req.user) {
                            return resolve(res.status(401).json({ error: 'Unauthorized: User not authenticated' }));
                        }
                        const userId = req.user.id;
                        const { id } = req.params;
                        const { text, username, userid, createdAt } = req.body;
                        // Check if the article exists
                        const article = yield article_1.Article.findById(id);
                        if (!article) {
                            return resolve(res.status(404).json({ status: 'error', message: 'Article not found' }));
                        }
                        // Check if the user exists
                        const user = yield user_1.User.findById(userId);
                        if (!user) {
                            return resolve(res.status(404).json({ status: 'error', message: 'User not found' }));
                        }
                        if (!user.username) {
                            return resolve(res.status(400).json({ status: 'error', message: 'User does not have a username' }));
                        }
                        let newComment = yield comment_1.Comment.create({
                            userid: userId,
                            username: user.username,
                            text,
                            createdAt: new Date(),
                        });
                        article.comments.push(newComment);
                        yield article.save();
                        // Respond with the created comment data and success message
                        resolve(res.status(201).json({ status: 'success', message: 'Comment created successfully', newComment }));
                    }));
                }));
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
                    const commentIndex = article.comments.findIndex((c) => c._id.toString() === commentId);
                    if (commentIndex === -1) {
                        return res.status(404).json({ status: 'error', message: 'Comment not found' });
                    }
                    // Check user ownership
                    if (article.comments[commentIndex].userid !== userId) {
                        return res.status(403).json({ status: 'error', message: 'Unauthorized: User does not own the comment' });
                    }
                    // Use findByIdAndUpdate for atomic operation
                    // Remove the comment from the comments array
                    article.comments.splice(commentIndex, 1);
                    // Save the updated article
                    const updatedArticle = yield article_1.Article.findByIdAndUpdate(articleId, article, { new: true });
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
