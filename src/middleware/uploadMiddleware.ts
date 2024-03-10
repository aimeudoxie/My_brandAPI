import multer from "multer";
// src/middleware/uploadMiddleware.ts
import { v4 as uuidv4 } from 'uuid';
// Rest of your code...

import * as path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const diskStorage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, uuidv4() + path.extname(file.originalname));
    },
});
const limits = {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
};

const upload = multer({
    storage: diskStorage,
    limits,
});

export default upload;