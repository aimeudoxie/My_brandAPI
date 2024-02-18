
import { Request, Response } from 'express';
import  { MessageModel, IMessage } from '../model/message';

class MessageController {
  static async createMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { name,email,subject, text,read } = req.body;
      const message: IMessage = await MessageModel.create(req.body);

      return res.status(201).json(message);

    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllMessages(_req: Request, res: Response): Promise<Response> {
    try {
      const messages: IMessage[] = await MessageModel.find();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default MessageController;