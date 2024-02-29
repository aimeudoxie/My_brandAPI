//commentcontroller.ts
import { Request, Response } from 'express';
import { Article, IArticle } from '../model/article';
import { User, IUser } from '../model/user';
import { authenticateToken } from '../middleware/authMiddleware'; 
import { Comment,IComment } from '../model/comment';

class CommentController {
    
  async addComment(req: Request, res: Response): Promise<Response> {
    try {
      await authenticateToken(req, res, async () => {
        if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const { id } = req.params;
        const { text, username,userid,createdAt } = req.body;
        const userId = req.user.id;

        // Check if the article exists
        const article = await Article.findById(id);
        if (!article) {
          return res.status(404).json({ status: 'error', message: 'Article not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        if (!user.username) {
          return res.status(400).json({ status: 'error', message: 'User does not have a username' });
        }
        const newComment = await Comment.create({
          userid: userId,
          username: user.username,
          text,
          createdAt: new Date(),
        }) as IComment;
        
        article.comments.push(newComment);

        const updatedArticle = await article.save();
      });
      return res.status(201).json({ status: 'success', message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  async  deleteComment(req: Request, res: Response): Promise<Response> {
    try {
      // Use authenticateToken middleware to check authorization
      await authenticateToken(req, res, async () => {
        if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
  
        const { articleId, commentId } = req.params;
        const userId = req.user.id;
  
        // Check if the article exists
        const article = await Article.findById(articleId);
        if (!article) {
          return res.status(404).json({ status: 'error', message: 'Article not found' });
        }
  
        // Check if the comment exists
        const comment = article.comments.find((c) => c._id.toString() === commentId);
if (!comment) {
res.status(404).json({ status: 'error', message: 'Comment not found' });
return; 

}        // Check if the user owns the comment
        if (comment.userid !== userId) {
          return res.status(403).json({ status: 'error', message: 'Unauthorized: User does not own the comment' });
        }
  
        article.comments = article.comments.filter((c) => c._id.toString() !== commentId);
    
        await article.save();
      });
      return res.status(200).json({ status: 'success', message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
}

export default new CommentController();