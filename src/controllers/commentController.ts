//commentcontroller.ts
import { Request, Response } from 'express';
import { Article, IArticle } from '../model/article';
import { User, IUser } from '../model/user';
import { Comment,IComment } from '../model/comment';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';

class CommentController {
  async addComment(req: Request, res: Response): Promise<Response> {
    try {
      return new Promise<Response>(async (resolve) => {
        await authenticateToken(req, res, async () => {
          if (!req.user) {
            return resolve(res.status(401).json({ error: 'Unauthorized: User not authenticated' }));
          }
  
          const userId = req.user.id;
          const { id } = req.params;
          const { text, username, userid, createdAt } = req.body;
  
          // Check if the article exists
          const article = await Article.findById(id);
          if (!article) {
            return resolve(res.status(404).json({ status: 'error', message: 'Article not found' }));
          }
  
          // Check if the user exists
          const user = await User.findById(userId);
          if (!user) {
            return resolve(res.status(404).json({ status: 'error', message: 'User not found' }));
          }
  
          if (!user.username) {
            return resolve(res.status(400).json({ status: 'error', message: 'User does not have a username' }));
          }
  
          let newComment = await Comment.create({
            userid: userId,
            username: user.username,
            text,
            createdAt: new Date(),
          }) as IComment;
  
          article.comments.push(newComment);
          await article.save();
  
          // Respond with the created comment data and success message
          resolve(res.status(201).json({ status: 'success', message: 'Comment created successfully', newComment }));
        });
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  async deleteComment(req: Request, res: Response): Promise<Response> {
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
  
        const commentIndex = article.comments.findIndex((c) => c._id.toString() === commentId);
  
        if (commentIndex === -1) {
          return res.status(404).json({ status: 'error', message: 'Comment not found' });
        }
  
        // Check user ownership
        if (article.comments[commentIndex].userid !== userId) {
          return res.status(403).json({ status: 'error', message: 'Unauthorized: User does not own the comment' });
        }
  
        // Use findByIdAndUpdate for atomic operation
         // Remove the comment from the comments array
      article.comments.splice(commentIndex, 1);
      // Save the updated article
      const updatedArticle = await Article.findByIdAndUpdate(articleId, article, { new: true });
      });
        return res.status(200).json({ status: 'success', message: 'Comment deleted successfully' });
   
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
}

export default new CommentController();