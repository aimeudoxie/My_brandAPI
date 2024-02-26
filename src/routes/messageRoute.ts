import express from 'express';
import  MessageController  from '../controllers/messageController';
import { authenticateAdmin,authenticateToken } from '../middleware/authMiddleware';

const messageRoute = express.Router();

messageRoute.post('/sendmessage',authenticateToken, MessageController.createMessage);
messageRoute.get('/read', authenticateToken,authenticateAdmin, MessageController.getAllMessages);

export default messageRoute;
