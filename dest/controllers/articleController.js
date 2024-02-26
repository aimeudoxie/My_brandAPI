"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
const articleValidation_1 = require("../validations/articleValidation");
class ArticleController {
    createArticle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, text } = req.body;
                const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const UpdatedArticleData = yield (0, articleValidation_1.validateArticle)({ title, text, imagePath }, res);
                if ('validationErrors' in UpdatedArticleData) {
                    const { validationErrors } = UpdatedArticleData;
                    return res.status(400).json({ status: 'fail', validationErrors });
                }
                const newArticle = new article_1.Article(UpdatedArticleData);
                yield newArticle.save();
                return res.status(201).json({ status: 'Success', data: newArticle });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    updateArticle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, text } = req.body;
                const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const UpdatedArticleData = yield (0, articleValidation_1.validateupdatedArticle)({ title, text, imagePath }, res);
                if ('validationErrors' in UpdatedArticleData) {
                    const { validationErrors } = UpdatedArticleData;
                    return res.status(400).json({ status: 'fail', validationErrors });
                }
                const updatedArticle = yield article_1.Article.findByIdAndUpdate(id, UpdatedArticleData, { new: true });
                if (!updatedArticle) {
                    return res.status(404).json({ status: 'fail', error: 'Article not found' });
                }
                return res.status(200).json({ status: 'Success', data: updatedArticle });
            }
            catch (error) {
                console.error('Error updating article:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    deleteArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedArticle = yield article_1.Article.findByIdAndDelete(id);
                if (!deletedArticle) {
                    return res.status(404).json({ status: 'fail', error: 'Article not found' });
                }
                return res.status(200).json({ status: 'Success', message: 'Article successfully Deleted' });
            }
            catch (error) {
                console.error('Error deleting article:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    getAllArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield article_1.Article.find();
                return res.status(200).json({ status: 'susccess', data: articles });
            }
            catch (error) {
                console.error('Error fetching articles:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    getOneArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const singleArticle = yield article_1.Article.findById(id);
                return res.status(200).json({ status: 'susccess', data: singleArticle });
            }
            catch (error) {
                console.error('Error fetching articles:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new ArticleController();
