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
const message_1 = require("../model/message");
class MessageController {
    static createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, subject, text, read } = req.body;
                const message = yield message_1.MessageModel.create(req.body);
                return res.status(201).json(message);
            }
            catch (error) {
                console.error('Error during signup:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getAllMessages(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.MessageModel.find();
                return res.status(200).json(messages);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = MessageController;
