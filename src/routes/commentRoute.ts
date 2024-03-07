import express from 'express';
import { upload } from '../middleware/uploadMiddleware';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';
const  commentRoute = express.Router();

commentRoute.post('/addcomment/:id', commentController.addComment);
commentRoute.get('/getAllComments/:articleId', commentController.getAllComments);
commentRoute.get('/getSingleComment/:articleId/:commentId', commentController.getSingleComment);
commentRoute.delete('/deletecomment/:articleId/:commentId', commentController.deleteComment);
commentRoute.put('/updateComment/:articleId/:commentId', commentController.updateComment);

export default commentRoute; 