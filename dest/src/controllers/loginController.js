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
const user_1 = require("../model/user");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class LoginController {
    static UserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const authUser = yield user_1.User.findOne({ email });
                if (!authUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                if (authUser.password) {
                    const passwordMatch = yield (0, bcryptjs_1.compare)(password, authUser.password);
                    if (!passwordMatch) {
                        return res.status(401).json({ error: 'Incorrect password' });
                    }
                    const token = jsonwebtoken_1.default.sign({ userId: authUser._id, username: authUser.username }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1h' });
                    return res.status(200).json({ status: "success", user: { _id: authUser._id, username: authUser.username, email: authUser.email, role: authUser.role }, token });
                }
                else {
                    return res.status(500).json({ status: "fail", error: 'User password not available' });
                }
            }
            catch (error) {
                console.error('Error during user login:', error);
                return res.status(500).json({ status: "error", error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = LoginController;
