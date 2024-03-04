import express from 'express';
import { upload } from '../middleware/uploadMiddleware';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';
const  commentRoute = express.Router();
commentRoute.post('/addcomment/:id', commentController.addComment);
commentRoute.delete('/deletecomment/:articleId/:commentId', commentController.deleteComment);

export default commentRoute; 