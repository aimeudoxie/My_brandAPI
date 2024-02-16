import express from "express";

import articleController from "../controllers/articleController";
import upload from '../middleware/uploadMiddleware';

const articleRoute=express.Router();

articleRoute.get("/articles",articleController.getAllArticles);
articleRoute.post("/create_article", upload.single('image'),articleController.createArticle);
/*
articleRoute.put("/users/:userId",articleController.updateUser);
articleRoute.delete("/users/:userId",articleController.deleteUser);*/

export default articleRoute;