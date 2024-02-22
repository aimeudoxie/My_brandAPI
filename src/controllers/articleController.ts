import { Request, Response } from 'express';
import { Article, IArticle } from '../model/article';
import { User, IUser } from '../model/user';
import { validateArticle,validateupdatedArticle } from '../validations/articleValidation'; 

class ArticleController {
  async createArticle(req: Request, res: Response): Promise<Response | IArticle> {
    try {
      const { title, text } = req.body;
      const imagePath = req.file?.path;

      const UpdatedArticleData = await validateArticle({ title, text, imagePath }, res);

      if ('validationErrors' in UpdatedArticleData) {
        const { validationErrors } = UpdatedArticleData;
        return res.status(400).json({ status:'fail', validationErrors });
      }

      const newArticle: IArticle = new Article(UpdatedArticleData);
      await newArticle.save();

      return res.status(201).json({ status:'Success', data: newArticle });
    } catch (error) {
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




  async addComment(req: Request, res: Response): Promise<IArticle | null> {
    try {
      const { articleId, userId } = req.params;
      const { text, username } = req.body;
  
      // Check if the article exists
      const article = await Article.findById(articleId);
  
      if (!article) {
        throw new Error('Article not found');
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.username) {
        throw new Error('User does not have a username');
      }
      // Create a new comment
      const newComment = {
        user: user._id,
        username: user.username, 
        text,
        createdAt: new Date(),
      };
  
      // Add the comment to the article's comments array
      article.comments.push(newComment);
  
      // Save the updated article
      const updatedArticle = await article.save();
  
      return updatedArticle;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

}

export default new ArticleController();
