import { Request, Response } from 'express';
import { ArticleModel, IArticle } from '../model/article';

class ArticleController {
  async createArticle(req: Request, res: Response): Promise<IArticle> {
    try {
      const { title, text } = req.body;
      const imagePath = req.file?.path; 

      const newArticle: IArticle = new ArticleModel({ title, text, imagePath });

      await newArticle.save();

      return newArticle; 
    } catch (error) {
      console.error(error);
  
      throw error;
    }
  }

  async updateArticle(req: Request, res: Response): Promise<IArticle | null> {
    try {
      const { id } = req.params;
      const { title, text } = req.body;
      const imagePath = req.file?.path; 

      const updatedArticle = await ArticleModel.findByIdAndUpdate(
        id,
        { title, text, imagePath },
        { new: true }
      );

      if (!updatedArticle) {

        throw new Error('Article not found');
      }

      return updatedArticle; 
    } catch (error) {
      console.error(error);
   
      throw error;
    }
  }

  async deleteArticle(req: Request, res: Response): Promise<IArticle | null> {
    try {
      const { id } = req.params;

      const deletedArticle = await ArticleModel.findByIdAndDelete(id);

      if (!deletedArticle) {
        
        throw new Error('Article not found');
      }

      return deletedArticle; 
    } catch (error) {
      console.error(error);
      
      throw error;
    }
  }
  async getAllArticles(req: Request, res: Response): Promise<Response> {
    try {
      const articles: IArticle[] = await ArticleModel.find();
      return res.status(200).json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getOneArticle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const singleArticle = await ArticleModel.findById(id);
      return res.status(200).json(singleArticle);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ArticleController();
