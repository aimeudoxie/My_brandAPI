

import mongoose, { Schema, Document,Types } from 'mongoose';
import {User, IUser } from '../model/user';
import { Comment, IComment, commentSchema } from './comment'; 

interface IArticle extends Document {
  title: string;
  text: string;
  imagePath: string;
  //author: string; 
  createdDate: Date;
  //category: string;
  comments: IComment[];
}


const articleSchema: Schema<IArticle> = new mongoose.Schema({

  title: { type: String, required: true },

  text: { type: String, required: true },

  imagePath: { type: String, required: true },

 //author: { type: String, required: true }, 
  createdDate: { type: Date, default: Date.now },
  //category: { type: String, required: true },
  comments: [commentSchema], 
});


const Article = mongoose.model<IArticle>('Article', articleSchema);

export {articleSchema, Article, IArticle };
