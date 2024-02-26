

import express from 'express';
import { upload } from '../middleware/uploadMiddleware';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';

const  ArticleRoute = express.Router();
ArticleRoute.get('/articles',articleController.getAllArticles);
ArticleRoute.get('/articles/:id', articleController.getOneArticle);
ArticleRoute.post('/create',authenticateToken,authenticateAdmin,  upload.single('image'), articleController.createArticle);
ArticleRoute.put('/articles/:id',authenticateToken,authenticateAdmin,  upload.single('image'), articleController.updateArticle);
ArticleRoute.delete('/articles/:id',authenticateToken,authenticateAdmin,  articleController.deleteArticle);


//ArticleRoute.delete('/deletecomment/:articleId/:commentId', commentController.deleteComment);

export default ArticleRoute;
