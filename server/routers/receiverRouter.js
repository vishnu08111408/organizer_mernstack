import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import ReceiverController from '../controllers/receiverController.js';
dotenv.config()

const rR = express.Router();

const rC = new ReceiverController();

rR.post("/mlogin", rC.login);
rR.get("/fcmtoken", auth, rC.getFCMToken);
rR.post("/fcmtoken", auth, rC.updateFCMToken);
rR.get("/", auth, rC.getAllRecipients)
rR.post("/application/add-organ", rC.addOrgan);
rR.get('/organs', auth, rC.getOrgans);
rR.post('/transplant', auth, rC.organTransplant);

export default rR;
