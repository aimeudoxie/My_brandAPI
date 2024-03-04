import mongoose, { set } from "mongoose";
import { Request, Response, NextFunction } from 'express';
import request from "supertest";
import {server} from "../index";
import { validateArticle, validateupdatedArticle } from '../validations/articleValidation';
import { validateUser, validateupdatedUser } from '../validations/userValidation';
import jwt from 'jsonwebtoken';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware';
import { User } from '../model/user';

import dotenv from "dotenv";
dotenv.config();


describe("API Endpoints", () => {

  let authToken: string;
  let ArticleId: string;
  let userId: string;
  let username:string;
  let commentId:string;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb+srv://eudoxie:umwamikazi@cluster0.ev0bus6.mongodb.net/my_brandtest');
    }
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  

it("POST /api/signup should register a user", async () => {
  const user = {
    firstname: "test3",
    lastname: "test3",
    username:"test3",
    email: "test3@gmail.com",
    role:"admin",
    password: "testing",
  };
  const response = await request(server).post("/api/signup").send(user);
  
  if (response.status !== 201) {
    console.log('Response Body:', response.body);
  }
  expect(response.status).toBe(201);
  const createduser = response.body.data;
    const userWithId = { ...createduser, id: createduser._id };
    username=createduser.username;
    userId = createduser._id;
});

it("POST /api/login should log in a user", async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "testing",
  };
  const response = await request(server).post("/api/login").send(credentials);
  expect(response.status).toBe(200);
  authToken = response.body.token;
  expect(authToken).toBeTruthy();
});


it("GET /api/users should return a list of users", async () => {
  const response = await request(server)
    .get("/api/users")
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});

it("POST /api/sendmessage should send a message", async () => {
  const message = {
    name: "testuser",
    email: "testuser@gmail.com",
    subject:"testing",
    text: "testing",
    read:"false"
  };
  const response = await request(server)
  .post("/api/sendmessage").send(message)
    .set("Authorization", authToken);
  expect(response.status).toBe(201);
});

it("GET /api/read should return a list of messages", async () => {
  const response = await request(server)
    .get("/api/read")
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});
it("PUT /api/users/:userId should update user", async () => {
  let user = {
    firstname: "testuser1",
    lastname: "testuser1"
  };
  const response = await request(server)
    .put(`/api/users/${userId}`)
    .send(user)
    .set("Authorization", authToken);

  expect(response.status).toBe(200);
});


it("POST /api/create should create a new article", async () => {
  const article = {
    title: "testing article",
    text: "testing article",
  };

  const response = await request(server)
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
    const ArticleWithId = { ...createdArticle, id: createdArticle._id };
    ArticleId = createdArticle._id;
});
it("PUT /api/articles/:id should update article", async () => {
  let article = {
    title: "testing article title",
    text: "testing article text"
  };
  
  const response = await request(server)
    .put(`/api/articles/${ArticleId}`)
    .send(article)
    .set("Authorization", authToken);

  expect(response.status).toBe(200);
});
it("GET /api/articles/:id should return a specific article", async () => {
  const response = await request(server)
    .get(`/api/articles/${ArticleId}`)
  expect(response.status).toBe(200);
});
it("GET /api/articles should return a list of articles", async () => {
  const response = await request(server)
    .get("/api/articles")
  expect(response.status).toBe(200);
});

it("POST /api/addcomment/:id should post a comment", async () => {
  const comment = {
    userid: `${userId}`,
    username: `${username}`,
    text: "testing comments",
    createdAt: new Date(),
  };
  const response = await request(server)
  .post(`/api/addcomment/${ArticleId}`).send(comment)
    .set("Authorization", authToken);
  expect(response.status).toBe(201);

  if (response.status !== 201) {
    console.log('Response Body:', response.body);
  }
  console.log(response.body)
  const createdcomment = response.body.newComment;
  const commentWithId = { ...createdcomment, id: createdcomment._id };
   commentId = commentWithId._id;
  
});
it("DELETE /api/deletecomment/:articleId/:commentId should delete the specified comment", async () => {
  
  const response = await request(server)
 
    .delete(`/api/deletecomment/${ArticleId}/${commentId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});

it("DELETE /api/articles/:id should delete the specified article", async () => {
  const response = await request(server)
    .delete(`/api/articles/${ArticleId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});

it("DELETE /api/users/:userId should delete the specified user", async () => {
  const response = await request(server)
    .delete(`/api/users/${userId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});
it('should validate article data successfully', async () => {
  const articleData = {
    title: 'Sample Title',
    text: 'Sample Text',
    imagePath: 'sample/image/path.jpg',
  };

  const result = await validateArticle(articleData, {} as any);

  expect(result).toEqual({
    title: 'Sample Title',
    text: 'Sample Text',
    imagePath: 'sample/image/path.jpg',
  });
});

it('should handle validation errors', async () => {
  const invalidArticleData = {
    // Missing required fields
  };

  const result = await validateArticle(invalidArticleData, {} as any);

  expect(result).toHaveProperty('validationErrors');
  const validationErrors = (result as any).validationErrors as Record<string, string>;
  expect(validationErrors).toHaveProperty('title');
  expect(validationErrors).toHaveProperty('text');
  expect(validationErrors).toHaveProperty('imagePath');
});
it('should validate updated article data successfully', async () => {
  const articleData = {
    title: 'Updated Title',
    text: 'Updated Text',
    imagePath: 'updated/image/path.jpg',
  };

  const result = await validateupdatedArticle(articleData, {} as any);

  expect(result).toEqual({
    title: 'Updated Title',
    text: 'Updated Text',
    imagePath: 'updated/image/path.jpg',
  });
});

it('should handle validation errors for updated article', async () => {
  const invalidArticleData = {
    // Invalid values for optional fields
    title: '', // Assuming title is optional
  };

  const result = await validateupdatedArticle(invalidArticleData, {} as any);

  expect(result).toHaveProperty('validationErrors');
  const validationErrors = (result as any).validationErrors as Record<string, string>;
  expect(validationErrors).toHaveProperty('title');
});
it('should validate user data successfully', async () => {
  const userData = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  };

  const result = await validateUser(userData);

  expect(result).toEqual({
    firstname: 'John',
    lastname: 'Doe',
    username: 'john_doe',
    email: 'john@example.com',
    password: expect.any(String), // Hashed password
    role: 'user',
  });
});
it('should validate updated user data successfully', async () => {
  const userData = {
    firstname: 'Updated John',
    lastname: 'Updated Doe',
    username: 'updated_john_doe',
    email: 'updated_john@example.com',
    password: 'updated_password123',
    role: 'admin',
  };

  const result = await validateupdatedUser(userData);

  expect(result).toEqual({
    firstname: 'Updated John',
    lastname: 'Updated Doe',
    username: 'updated_john_doe',
    email: 'updated_john@example.com',
    password: expect.any(String), // Hashed password
    role: 'admin',
  });
});

it('should handle validation errors for updated user', async () => {
  const invalidUserData = {
    // Invalid values for optional fields
    firstname: '', // Assuming firstname is optional
  };

  const result = await validateupdatedUser(invalidUserData);

  expect(result).toHaveProperty('validationErrors');
  const validationErrors = (result as any).validationErrors as Record<string, string>;
  expect(validationErrors).toHaveProperty('firstname');
});

});
