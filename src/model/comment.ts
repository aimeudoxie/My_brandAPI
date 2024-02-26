import mongoose, { Schema, SchemaTypes, Document, Types } from 'mongoose';
import {User, IUser } from '../model/user';

interface IComment extends Document {
  userid: string; 
  username: string;
  text: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  userid: { type: String, required: true },
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model<IComment>('Comment', commentSchema);
export { commentSchema, IComment,Comment };
