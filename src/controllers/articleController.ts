import { Request, Response } from 'express';
import Article, { IArticle } from '../model/article';
import upload from '../middleware/uploadMiddleware';
import path from 'path';
import fs from 'fs';

class ArticleController {
    static async createArticle(req: Request, res: Response): Promise<Response> {
        try {
          const { title, text, image } = req.body;

      
          if (!title || !text) {
            return res.status(400).json({ error: 'Title and text are required for an article' });
          }
          


          const handleImageUpload = async (err: any): Promise<Response> => {
            if (err) {
              return res.status(500).json({ error: 'Error handling image upload' });
            }
            const imageFile: Express.Multer.File | undefined = req.file;
            let image: string | undefined;
      
            if (imageFile) {
              image = path.join('uploads', imageFile.filename);
            } else {
              return res.status(400).json({ error: 'Image file not uploaded' });
            }
      
            const article: IArticle = await Article.create({ title, image, text });
            return res.status(201).json(article);
          };

          const file=  upload.single('image')(req, res, handleImageUpload); 
          const article: IArticle = await Article .create({ title, text, image:file});
      return res.status(201).json(article);

        }
        catch (error) {
          console.error('Error creating article:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
          
        }
      }
    








  static async getAllArticles(req: Request, res: Response): Promise<Response> {
    try {
      const articles: IArticle[] = await Article.find();
      return res.status(200).json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add other methods as needed

  // ...
}

export default ArticleController;
