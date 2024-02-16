import express from 'express';
import dbConnect from './database/dbconnect';
import userRoute from './routes/userRoute';
import articleRoute from './routes/articleRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

dbConnect();

app.use('/api', userRoute);
app.use('/api', articleRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
