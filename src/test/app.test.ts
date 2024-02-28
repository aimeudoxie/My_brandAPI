import mongoose, { set } from "mongoose";
import request from "supertest";
import app from "../index";

import dotenv from "dotenv";
dotenv.config();

describe("API Endpoints", () => {

  let authToken: string;
  let ArticleId: number;
  let userId: string;

beforeAll(async () => {
  await  mongoose.connect('mongodb+srv://eudoxie:umwamikazi@cluster0.ev0bus6.mongodb.net/my_brand');
});
afterAll(async () => {
  await mongoose.connection.close();
});

it("POST /api/signup should register a user", async () => {
  const user = {
    firstname: "kigali12",
    lastname: "kigali12",
    username:"kigali12",
    email: "kigali12@gmail.com",
    role:"user",
    password: "kigali",
  };
  const response = await request(app).post("/api/signup").send(user);
  expect(response.status).toBe(201);
});
it("POST /api/login should log in a user", async () => {
  const credentials = {
    email: "kigali@gmail.com",
    password: "kigali",
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
/*
it("POST /api/create should create a new article", async () => {
  let article = {
    title: "online shopping",
    text: "thank you",
    imagePath: `'D:\\ATLP\\my_brand\\Images\\ben-kolde-FaPxZ88yZrw-unsplash.jpg'`,
  };
  console.log('Test Data:', article);
  const response = await request(app)
    .post("/api/create")
    .send(article)
    .set("Authorization", authToken);
  expect(response.status).toBe(201);
  const { message, article: createdBrand } = response.body;
  const articleWithId = { ...createdBrand, id: createdBrand._id };
  ArticleId =  createdBrand._id;
});*/

it("GET /api/articles should return a list of articles", async () => {
  const response = await request(app)
    .get("/api/articles")
  expect(response.status).toBe(200);
});

it("POST /api/sendmessage should send a message", async () => {
  const message = {
    name: "kigali",
    email: "kigali1@gmail.com",
    subject:"appreciation",
    text: "thank you",
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

/*it("DELETE /users/:userId should delete the specified user", async () => {
  const response = await request(app)
    .delete('/api/users/${userId}')
    .set("Authorization", authToken);
  expect(response.status).toBe(200);
});*/

});


