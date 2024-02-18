import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.set('strictQuery', false);

dotenv.config();

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://eudoxie:umwamikazi@cluster0.ev0bus6.mongodb.net/my_brand');
    console.log('Database Connected!');
  } catch (error) {
    console.log('error', (error as Error).message);
  }
  

};

export default dbConnect;

