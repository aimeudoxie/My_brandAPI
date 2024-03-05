import express from 'express';
import dbConnect from './database/dbconnect';
import userRoute from './routes/userRoute';
import articleRoute from './routes/articleRoute';
import messageRoute from './routes/messageRoute';
import loginRoute from './routes/loginRoute';
import commentRoute from './routes/commentRoute';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import dotenv from 'dotenv';
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

dbConnect();
app.use(cors());
app.use('/api', userRoute);
app.use('/api', articleRoute);
app.use('/api', messageRoute);
app.use('/api', loginRoute);
app.use('/api',commentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/uploads',express.static('uploads'))
const server= app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
export{app,server} ;
