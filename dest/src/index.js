"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = __importDefault(require("./database/dbconnect"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const articleRoute_1 = __importDefault(require("./routes/articleRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
(0, dbconnect_1.default)();
app.use(cors());
app.use('/api', userRoute_1.default);
app.use('/api', articleRoute_1.default);
app.use('/api', messageRoute_1.default);
app.use('/api', loginRoute_1.default);
app.use('/api', commentRoute_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
exports.server = server;
