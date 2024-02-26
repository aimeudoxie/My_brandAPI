import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role?: string | undefined;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role:{
    type: String,
    default:'user',
  }
});
 
const User = mongoose.model<IUser>('User', userSchema);

export {userSchema, User};