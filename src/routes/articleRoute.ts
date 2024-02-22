

import express from 'express';
import { upload } from '../middleware/uploadMiddleware';
import articleController from '../controllers/articleController';

const  ArticleRoute = express.Router();
ArticleRoute.get('/articles', articleController.getAllArticles);
ArticleRoute.get('/articles/:id', articleController.getOneArticle);
ArticleRoute.post('/create', upload.single('image'), articleController.createArticle);
ArticleRoute.put('/articles/:id', upload.single('image'), articleController.updateArticle);
ArticleRoute.delete('/articles/:id', articleController.deleteArticle);
ArticleRoute.post('/addcomment/:id', articleController.addComment);

export default ArticleRoute;
