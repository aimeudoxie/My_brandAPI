import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  image: string;
  text: string;
}

const articleSchema: Schema<IArticle> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
