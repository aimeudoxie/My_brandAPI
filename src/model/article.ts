

import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  text: string;
  imagePath: string;
}

const articleSchema: Schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const ArticleModel = mongoose.model<IArticle>('Article', articleSchema);

export { ArticleModel, IArticle };
