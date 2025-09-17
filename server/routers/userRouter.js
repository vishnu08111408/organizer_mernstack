import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
dotenv.config()

const uR = express.Router();

const uC = new UserController();

// uR.post("/home", auth,  uC.updateLocation);
// uR.get("/home", auth, uC.getHome);
// uR.get("/location", auth, uC.getAll);
// uR.post("/friend/:id", auth, uC.sendFriendRequest);
// uR.post("/friend/accept/:id", auth, uC.acceptFriendRequest);
uR.post("/send", uC.sendNotification);

uR.post("/test", uC.test)

export default uR;
