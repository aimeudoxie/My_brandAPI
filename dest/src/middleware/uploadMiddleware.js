"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require('path');
const currentDirectory = __dirname;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(currentDirectory, '../uploads/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
