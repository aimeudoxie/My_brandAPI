import express from 'express';
import  MessageController  from '../controllers/messageController';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';

const messageRoute = express.Router();

messageRoute.post('/sendmessage',authenticateToken, MessageController.createMessage);
messageRoute.get('/read', authenticateToken,authenticateAdmin, MessageController.getAllMessages);
messageRoute.delete('/deleteMessage/:messageId', authenticateToken,authenticateAdmin, MessageController.deleteMessage);
messageRoute.put('/updateMessage/:messageId', authenticateToken,authenticateAdmin, MessageController.updateMessage);
messageRoute.get('/getSingleMessage/:messageId', authenticateToken,authenticateAdmin, MessageController.getSingleMessage);

export default messageRoute;
 