import express from 'express';
import LoginController from '../controllers/loginController';


const loginRoute =express.Router();

// Define the login route
loginRoute.post('/login', LoginController.UserLogin);

export default loginRoute;
