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
exports.validateupdatedArticle = exports.validateArticle = void 0;
const zod_1 = require("zod");
const articleZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title is required' }),
    text: zod_1.z.string().min(1, { message: 'Text is required' }),
    imagePath: zod_1.z.string().min(1, { message: 'Image path is required' }),
});
const validateArticle = (articleData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = articleZodSchema.parse(articleData);
        const { title, text, imagePath } = validatedData;
        return { title, text, imagePath };
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation failed:', error.errors);
            const errorMessages = {};
            error.errors.forEach((validationError) => {
                const fieldName = validationError.path[0];
                const errorMessage = validationError.message;
                errorMessages[fieldName] = errorMessage;
            });
            return { validationErrors: errorMessages };
        }
        else {
            console.error('Unexpected error:', error);
            return { validationErrors: { unexpected: 'Unexpected error occurred' } };
        }
    }
});
exports.validateArticle = validateArticle;
const articleupdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title is required' }).optional(),
    text: zod_1.z.string().min(1, { message: 'Text is required' }).optional(),
    imagePath: zod_1.z.string().min(1, { message: 'Image path is required' }).optional(),
});
const validateupdatedArticle = (articleData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = articleupdateSchema.parse(articleData);
        const { title, text, imagePath } = validatedData;
        return { title, text, imagePath };
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation failed:', error.errors);
            const errorMessages = {};
            error.errors.forEach((validationError) => {
                const fieldName = validationError.path[0];
                const errorMessage = validationError.message;
                errorMessages[fieldName] = errorMessage;
            });
            return { validationErrors: errorMessages };
        }
        else {
            console.error('Unexpected error:', error);
            return { validationErrors: { unexpected: 'Unexpected error occurred' } };
        }
    }
});
exports.validateupdatedArticle = validateupdatedArticle;
