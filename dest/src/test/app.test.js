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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("API Endpoints", () => {
    let authToken;
    let ArticleId;
    let userId;
    let username;
    let commentId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (mongoose_1.default.connection.readyState === 0) {
            yield mongoose_1.default.connect('mongodb+srv://eudoxie:umwamikazi@cluster0.ev0bus6.mongodb.net/my_brandtest');
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it("POST /api/signup should register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: "test",
            lastname: "test",
            username: "test",
            email: "test@gmail.com",
            role: "admin",
            password: "testing",
        };
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/signup").send(user);
        if (response.status !== 201) {
            console.log('Response Body:', response.body);
        }
        expect(response.status).toBe(201);
        const createduser = response.body.data;
        const userWithId = Object.assign(Object.assign({}, createduser), { id: createduser._id });
        username = createduser.username;
        userId = createduser._id;
    }));
    it("POST /api/login should log in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const credentials = {
            email: "test@gmail.com",
            password: "testing",
        };
        const response = yield (0, supertest_1.default)(index_1.default).post("/api/login").send(credentials);
        expect(response.status).toBe(200);
        authToken = response.body.token;
        expect(authToken).toBeTruthy();
    }));
    it("GET /api/users should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/users")
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("POST /api/sendmessage should send a message", () => __awaiter(void 0, void 0, void 0, function* () {
        const message = {
            name: "testuser",
            email: "testuser@gmail.com",
            subject: "testing",
            text: "testing",
            read: "false"
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/api/sendmessage").send(message)
            .set("Authorization", authToken);
        expect(response.status).toBe(201);
    }));
    it("GET /api/read should return a list of messages", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/read")
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("PUT /api/users/:userId should update user", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = {
            firstname: "testuser1",
            lastname: "testuser1"
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/users/${userId}`)
            .send(user)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("POST /api/create should create a new article", () => __awaiter(void 0, void 0, void 0, function* () {
        const article = {
            title: "testing article",
            text: "testing article",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/api/create")
            .field('title', article.title)
            .field('text', article.text)
            .attach('image', 'D:\\ATLP\\my_brand\\Images\\ben-kolde-FaPxZ88yZrw-unsplash.jpg')
            .set("Authorization", authToken);
        if (response.status !== 201) {
            console.log('Response Body:', response.body);
        }
        expect(response.status).toBe(201);
        const createdArticle = response.body.data;
        const ArticleWithId = Object.assign(Object.assign({}, createdArticle), { id: createdArticle._id });
        ArticleId = createdArticle._id;
    }));
    it("PUT /api/articles/:id should update article", () => __awaiter(void 0, void 0, void 0, function* () {
        let article = {
            title: "testing article title",
            text: "testing article text"
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/articles/${ArticleId}`)
            .send(article)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("GET /api/articles/:id should return a specific article", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get(`/api/articles/${ArticleId}`);
        expect(response.status).toBe(200);
    }));
    it("GET /api/articles should return a list of articles", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/articles");
        expect(response.status).toBe(200);
    }));
    it("POST /api/addcomment/:id should post a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const comment = {
            userid: `${userId}`,
            username: `${username}`,
            text: "testing comments",
            createdAt: new Date(),
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(`/api/addcomment/${ArticleId}`).send(comment)
            .set("Authorization", authToken);
        expect(response.status).toBe(201);
        if (response.status !== 201) {
            console.log('Response Body:', response.body);
        }
        const createdcomment = response.body;
        const commentWithId = Object.assign(Object.assign({}, createdcomment), { id: createdcomment._id });
        commentId = createdcomment._id;
    }));
    it("DELETE /api/deletecomment/:articleId/:commentId should delete the specified comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .delete(`/api/deletecomment/${ArticleId}/${commentId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("DELETE /api/articles/:id should delete the specified article", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .delete(`/api/articles/${ArticleId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("DELETE /api/users/:userId should delete the specified user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .delete(`/api/users/${userId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
});
