

import express from 'express';
import { upload } from '../middleware/uploadMiddleware';
import articleController from '../controllers/articleController';

const  ArticleRoute = express.Router();
ArticleRoute.get('/articles', articleController.getAllArticles);
ArticleRoute.post('/create', upload.single('image'), articleController.createArticle);
ArticleRoute.put('/articles/:id', upload.single('image'), articleController.updateArticle);
ArticleRoute.delete('/articles/:id', articleController.deleteArticle);

export default ArticleRoute;
