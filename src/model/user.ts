import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
    unique: true,
  },
  lastname: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  }
});
 
const User = mongoose.model<IUser>('User', userSchema);

export {userSchema, User};