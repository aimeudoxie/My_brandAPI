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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.header('Authorization');
            if (!authHeader)
                throw new Error('You don\'t have access to do that action');
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized: Token not provided' });
            }
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback_secret_key', (err, decodedToken) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error('Error verifying token:', err);
                    return res.status(403).json({ status: 'Fail', error: 'Invalid token' });
                }
                //console.log('Decoded Token:', decodedToken);
                const userId = decodedToken.userId;
                // Check if the user exists
                const user = yield user_1.User.findById(userId);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                req.user = user; // Attach user to the request for later use
                next();
            }));
        }
        catch (error) {
            console.error('Error during token authentication:', error);
            return res.status(500).json({ status: 'fail', error: 'Internal Server Error' });
        }
    });
}
exports.authenticateToken = authenticateToken;
function authenticateAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ensure that the user has been authenticated first
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            }
            // Check if the user is an admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Admin access required' });
            }
            next();
        }
        catch (error) {
            console.error('Error during admin authentication:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.authenticateAdmin = authenticateAdmin;
