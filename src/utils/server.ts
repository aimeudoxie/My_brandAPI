import express from "express";
import userRoute from '../routes/userRoute';
import articleRoute from '../routes/articleRoute';
import messageRoute from '../routes/messageRoute';
import loginRoute from '../routes/loginRoute';
import commentRoute from '../routes/commentRoute';
import {authenticateToken} from "../middleware/authMiddleware";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(authenticateToken);
  
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', articleRoute);
app.use('/api', messageRoute);
app.use('/api', loginRoute);
app.use('/api',commentRoute)



  return app;
}

export default createServer;
