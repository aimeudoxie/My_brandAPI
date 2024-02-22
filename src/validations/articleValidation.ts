
import { z, ZodError } from 'zod';
import { Request, Response } from 'express';
import { IArticle } from '../model/article';

const articleZodSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  text: z.string().min(1, { message: 'Text is required' }),
  imagePath: z.string().min(1, { message: 'Image path is required' }),  
});


interface ValidatedArticle extends IArticle {}

const validateArticle = async (articleData: any, res: Response): Promise<ValidatedArticle  | { validationErrors: Record<string, string> }>  => {
  try {
    const validatedData = articleZodSchema.parse(articleData);

    const { title, text, imagePath } = validatedData;
    return { title, text, imagePath } as ValidatedArticle;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation failed:', error.errors);

      const errorMessages: Record<string, string> = {};
      error.errors.forEach((validationError) => {
        const fieldName = validationError.path[0];
        const errorMessage = validationError.message;
        errorMessages[fieldName] = errorMessage;
      });

      return { validationErrors: errorMessages };
    } else {
      console.error('Unexpected error:', error);
      return { validationErrors: { unexpected: 'Unexpected error occurred' } };
    } 
  }
};

const articleupdateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).optional(),
  text: z.string().min(1, { message: 'Text is required' }).optional(),
  imagePath: z.string().min(1, { message: 'Image path is required' }).optional(),  
});


interface ValidatedArticle extends IArticle {}

const validateupdatedArticle = async (articleData: any, res: Response): Promise<ValidatedArticle  | { validationErrors: Record<string, string> }>  => {
  try {
    const validatedData = articleupdateSchema.parse(articleData);

    const { title, text, imagePath } = validatedData;
    return { title, text, imagePath } as ValidatedArticle;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation failed:', error.errors);

      const errorMessages: Record<string, string> = {};
      error.errors.forEach((validationError) => {
        const fieldName = validationError.path[0];
        const errorMessage = validationError.message;
        errorMessages[fieldName] = errorMessage;
      });

      return { validationErrors: errorMessages };
    } else {
      console.error('Unexpected error:', error);
      return { validationErrors: { unexpected: 'Unexpected error occurred' } };
    }
  }
};

export { validateArticle, validateupdatedArticle };
