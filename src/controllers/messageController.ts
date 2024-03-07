import { Request, Response } from 'express';
import { MessageModel, IMessage } from '../model/message';

class MessageController {
  static async createMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, subject, text, read } = req.body;
      const message: IMessage = await MessageModel.create(req.body);

      return res.status(201).json(message);
    } catch (error) {
      console.error('Error during message creation:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllMessages(_req: Request, res: Response): Promise<Response> {
    try {
      const messages: IMessage[] = await MessageModel.find();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getSingleMessage(req: Request, res: Response): Promise<Response> {
    try {
      const messageId: string = req.params.messageId;
      const message: IMessage | null = await MessageModel.findById(messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json(message);
    } catch (error) {
      console.error('Error fetching single message:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteMessage(req: Request, res: Response): Promise<Response> {
    try {
      const messageId: string = req.params.messageId;
      const deletedMessage: IMessage | null = await MessageModel.findByIdAndDelete(messageId);

      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateMessage(req: Request, res: Response): Promise<Response> {
    try {
      const messageId: string = req.params.messageId;
      const updatedMessage: IMessage | null = await MessageModel.findByIdAndUpdate(
        messageId,
        req.body,
        { new: true }
      );

      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json(updatedMessage);
    } catch (error) {
      console.error('Error updating message:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static async markAsRead(req: Request, res: Response): Promise<Response> {
    try {
      const messageId: string = req.params.messageId;
      const updatedMessage: IMessage | null = await MessageModel.findByIdAndUpdate(
        messageId,
        { read: true },
        { new: true }
      );

      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json(updatedMessage);
    } catch (error) {
      console.error('Error marking message as read:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default MessageController;
