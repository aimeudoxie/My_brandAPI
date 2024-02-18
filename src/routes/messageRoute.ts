import express from 'express';
import  MessageController  from '../controllers/messageController';


const messageRoute = express.Router();

messageRoute.post('/sendmessage', MessageController.createMessage);
messageRoute.get('/read', MessageController.getAllMessages);

export default messageRoute;
