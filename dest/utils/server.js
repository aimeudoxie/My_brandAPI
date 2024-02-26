"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const articleRoute_1 = __importDefault(require("../routes/articleRoute"));
const messageRoute_1 = __importDefault(require("../routes/messageRoute"));
const loginRoute_1 = __importDefault(require("../routes/loginRoute"));
const commentRoute_1 = __importDefault(require("../routes/commentRoute"));
const authMiddleware_1 = require("../middleware/authMiddleware");
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(authMiddleware_1.authenticateToken);
    app.use(express_1.default.json());
    app.use('/api', userRoute_1.default);
    app.use('/api', articleRoute_1.default);
    app.use('/api', messageRoute_1.default);
    app.use('/api', loginRoute_1.default);
    app.use('/api', commentRoute_1.default);
    return app;
}
exports.default = createServer;
