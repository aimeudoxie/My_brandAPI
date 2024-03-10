import { Request, Response } from 'express';
import { Article, IArticle } from '../model/article';
import { validateArticle,validateupdatedArticle } from '../validations/articleValidation'; 
import cloudinary from '../helpers/cloudinary';
import upload from '../middleware/uploadMiddleware';

class ArticleController {
  async createArticle(req: Request, res: Response): Promise<Response | IArticle> {
    
    try {
      if(!req.file){
        return res.status(400).json({ message: "Please upload the image" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "images",
      });

      const { title, text } = req.body;
      
      
      const imagePath = result.secure_url;

      const UpdatedArticleData = await validateArticle({ title, text, imagePath }, res);

      if ('validationErrors' in UpdatedArticleData) {
        const { validationErrors } = UpdatedArticleData;
        return res.status(400).json({ status:'fail', validationErrors });
      }

      const newArticle: IArticle = new Article(UpdatedArticleData);

      await newArticle.save();

      return res.status(201).json({ status:'Success', data: newArticle});
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  async updateArticle(req: Request, res: Response): Promise<Response | IArticle | null> {
    try {
      const { id } = req.params;
      const { title, text } = req.body;
      const imagePath = req.file?.path;

      const UpdatedArticleData = await validateupdatedArticle({ title, text, imagePath }, res);

      if ('validationErrors' in UpdatedArticleData) {
        const { validationErrors } = UpdatedArticleData;
        return res.status(400).json({ status:'fail', validationErrors });
      }

      const updatedArticle = await Article.findByIdAndUpdate(id, UpdatedArticleData, { new: true });

      if (!updatedArticle) {
        return res.status(404).json({ status:'fail',error:'Article not found'});
      }

      return res.status(200).json({status:'Success', data: updatedArticle });
    } catch (error) {
      console.error('Error updating article:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  async deleteArticle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deletedArticle:IArticle | null = await Article.findByIdAndDelete(id);

      if (!deletedArticle) {
        
        return res.status(404).json({ status:'fail',error:'Article not found'});
      }
      return res.status(200).json({status:'Success',message:'Article successfully Deleted'});
    } catch (error) {
      console.error('Error deleting article:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async getAllArticles(req: Request, res: Response): Promise<Response> {
    try {
      const articles: IArticle[] = await Article.find();
      articles.sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1));
      return res.status(200).json({status:'susccess', data: articles});

    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  async getOneArticle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const singleArticle = await Article.findById(id);
      return res.status(200).json({status:'susccess', data: singleArticle});
    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

}

export default new ArticleController();