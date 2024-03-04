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
const index_1 = require("../index");
const articleValidation_1 = require("../validations/articleValidation");
const userValidation_1 = require("../validations/userValidation");
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
        index_1.server.close();
    }));
    it("POST /api/signup should register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: "test3",
            lastname: "test3",
            username: "test3",
            email: "test3@gmail.com",
            role: "admin",
            password: "testing",
        };
        const response = yield (0, supertest_1.default)(index_1.server).post("/api/signup").send(user);
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
        const response = yield (0, supertest_1.default)(index_1.server).post("/api/login").send(credentials);
        expect(response.status).toBe(200);
        authToken = response.body.token;
        expect(authToken).toBeTruthy();
    }));
    it("GET /api/users should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
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
        const response = yield (0, supertest_1.default)(index_1.server)
            .post("/api/sendmessage").send(message)
            .set("Authorization", authToken);
        expect(response.status).toBe(201);
    }));
    it("GET /api/read should return a list of messages", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
            .get("/api/read")
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("PUT /api/users/:userId should update user", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = {
            firstname: "testuser1",
            lastname: "testuser1"
        };
        const response = yield (0, supertest_1.default)(index_1.server)
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
        const response = yield (0, supertest_1.default)(index_1.server)
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
        const response = yield (0, supertest_1.default)(index_1.server)
            .put(`/api/articles/${ArticleId}`)
            .send(article)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("GET /api/articles/:id should return a specific article", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
            .get(`/api/articles/${ArticleId}`);
        expect(response.status).toBe(200);
    }));
    it("GET /api/articles should return a list of articles", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
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
        const response = yield (0, supertest_1.default)(index_1.server)
            .post(`/api/addcomment/${ArticleId}`).send(comment)
            .set("Authorization", authToken);
        expect(response.status).toBe(201);
        if (response.status !== 201) {
            console.log('Response Body:', response.body);
        }
        console.log(response.body);
        const createdcomment = response.body.newComment;
        const commentWithId = Object.assign(Object.assign({}, createdcomment), { id: createdcomment._id });
        commentId = commentWithId._id;
    }));
    it("DELETE /api/deletecomment/:articleId/:commentId should delete the specified comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
            .delete(`/api/deletecomment/${ArticleId}/${commentId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("DELETE /api/articles/:id should delete the specified article", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
            .delete(`/api/articles/${ArticleId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it("DELETE /api/users/:userId should delete the specified user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.server)
            .delete(`/api/users/${userId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(200);
    }));
    it('should validate article data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const articleData = {
            title: 'Sample Title',
            text: 'Sample Text',
            imagePath: 'sample/image/path.jpg',
        };
        const result = yield (0, articleValidation_1.validateArticle)(articleData, {});
        expect(result).toEqual({
            title: 'Sample Title',
            text: 'Sample Text',
            imagePath: 'sample/image/path.jpg',
        });
    }));
    it('should handle validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidArticleData = {
        // Missing required fields
        };
        const result = yield (0, articleValidation_1.validateArticle)(invalidArticleData, {});
        expect(result).toHaveProperty('validationErrors');
        const validationErrors = result.validationErrors;
        expect(validationErrors).toHaveProperty('title');
        expect(validationErrors).toHaveProperty('text');
        expect(validationErrors).toHaveProperty('imagePath');
    }));
    it('should validate updated article data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const articleData = {
            title: 'Updated Title',
            text: 'Updated Text',
            imagePath: 'updated/image/path.jpg',
        };
        const result = yield (0, articleValidation_1.validateupdatedArticle)(articleData, {});
        expect(result).toEqual({
            title: 'Updated Title',
            text: 'Updated Text',
            imagePath: 'updated/image/path.jpg',
        });
    }));
    it('should handle validation errors for updated article', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidArticleData = {
            // Invalid values for optional fields
            title: '', // Assuming title is optional
        };
        const result = yield (0, articleValidation_1.validateupdatedArticle)(invalidArticleData, {});
        expect(result).toHaveProperty('validationErrors');
        const validationErrors = result.validationErrors;
        expect(validationErrors).toHaveProperty('title');
    }));
    it('should validate user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
        };
        const result = yield (0, userValidation_1.validateUser)(userData);
        expect(result).toEqual({
            firstname: 'John',
            lastname: 'Doe',
            username: 'john_doe',
            email: 'john@example.com',
            password: expect.any(String), // Hashed password
            role: 'user',
        });
    }));
    it('should validate updated user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            firstname: 'Updated John',
            lastname: 'Updated Doe',
            username: 'updated_john_doe',
            email: 'updated_john@example.com',
            password: 'updated_password123',
            role: 'admin',
        };
        const result = yield (0, userValidation_1.validateupdatedUser)(userData);
        expect(result).toEqual({
            firstname: 'Updated John',
            lastname: 'Updated Doe',
            username: 'updated_john_doe',
            email: 'updated_john@example.com',
            password: expect.any(String), // Hashed password
            role: 'admin',
        });
    }));
    it('should handle validation errors for updated user', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUserData = {
            // Invalid values for optional fields
            firstname: '', // Assuming firstname is optional
        };
        const result = yield (0, userValidation_1.validateupdatedUser)(invalidUserData);
        expect(result).toHaveProperty('validationErrors');
        const validationErrors = result.validationErrors;
        expect(validationErrors).toHaveProperty('firstname');
    }));
});
