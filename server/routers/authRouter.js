// Desc: Router for authentication
import express from 'express';
import dotenv from 'dotenv';
import AuthController from '../controllers/authController.js';

dotenv.config()

const authRouter = express.Router();

const aC = new AuthController();

authRouter.post("/register", aC.register);

authRouter.post("/login", aC.login);

authRouter.post("/otp", aC.verifyOTP);

authRouter.post("/getdata", aC.getData);

export default authRouter;

