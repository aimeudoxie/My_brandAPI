import mongoose, { set } from "mongoose";
import request from "supertest";
import app from "../index";

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
  });
  

it("POST /api/signup should register a user", async () => {
  const user = {
    firstname: "test",
    lastname: "test",
    username:"test",
    email: "test@gmail.com",
    role:"admin",
    password: "testing",
  };
  const response = await request(app).post("/api/signup").send(user);
  
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
  const response = await request(app).post("/api/login").send(credentials);
  expect(response.status).toBe(200);
  authToken = response.body.token;
  expect(authToken).toBeTruthy();
});


it("GET /api/users should return a list of users", async () => {
  const response = await request(app)
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
  const response = await request(app)
  .post("/api/sendmessage").send(message)
    .set("Authorization", authToken);
  expect(response.status).toBe(201);
});

it("GET /api/read should return a list of messages", async () => {
  const response = await request(app)
    .get("/api/read")
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});
it("PUT /api/users/:userId should update user", async () => {
  let user = {
    firstname: "testuser1",
    lastname: "testuser1"
  };
  const response = await request(app)
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

  const response = await request(app)
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
  
  const response = await request(app)
    .put(`/api/articles/${ArticleId}`)
    .send(article)
    .set("Authorization", authToken);

  expect(response.status).toBe(200);
});
it("GET /api/articles/:id should return a specific article", async () => {
  const response = await request(app)
    .get(`/api/articles/${ArticleId}`)
  expect(response.status).toBe(200);
});
it("GET /api/articles should return a list of articles", async () => {
  const response = await request(app)
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
  const response = await request(app)
  .post(`/api/addcomment/${ArticleId}`).send(comment)
    .set("Authorization", authToken);
  expect(response.status).toBe(201);

  if (response.status !== 201) {
    console.log('Response Body:', response.body);
  }
  const createdcomment = response.body;
    const userWithId = { ...createdcomment, id: createdcomment._id };
    commentId = createdcomment._id;

});
it("DELETE /users/:userId should delete the specified user", async () => {
  const response = await request(app)
    .delete(`/api/users/${userId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});

it("DELETE /api/articles/:id should delete the specified article", async () => {
  const response = await request(app)
    .delete(`/api/articles/${ArticleId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});
it("DELETE /api/deletecomment/:articleId/:commentId should delete the specified comment", async () => {
  const response = await request(app)
    .delete(`/api/deletecomment/${ArticleId}/${commentId}`)
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});

});


