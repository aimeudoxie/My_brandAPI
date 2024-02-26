"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.articleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const comment_1 = require("./comment");
const articleSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    imagePath: { type: String, required: true },
    //author: { type: String, required: true }, 
    createdDate: { type: Date, default: Date.now },
    //category: { type: String, required: true },
    comments: [comment_1.commentSchema],
});
exports.articleSchema = articleSchema;
const Article = mongoose_1.default.model('Article', articleSchema);
exports.Article = Article;
