

import mongoose, { Schema, Document } from 'mongoose';
import {User, IUser } from '../model/user';

interface IArticle extends Document {
  title: string;
  text: string;
  imagePath: string;
  //author: string; 
  createdDate: Date;
  //category: string;
  comments: Array<{
    user: string; 
    username:string;
    text: string;
    createdAt: Date;
  }>;
}


const articleSchema: Schema<IArticle> = new mongoose.Schema({

  title: { type: String, required: true },

  text: { type: String, required: true },

  imagePath: { type: String, required: true },

 // author: { type: String, required: true }, 
  createdDate: { type: Date, default: Date.now },
  //category: { type: String, required: true },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});


const Article = mongoose.model<IArticle>('Article', articleSchema);

export {articleSchema, Article, IArticle };
