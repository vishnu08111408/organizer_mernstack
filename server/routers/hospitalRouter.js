import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import HospitalController from '../controllers/hospitalController.js';
dotenv.config()

const hR = express.Router();

const hC = new HospitalController();

// uR.post("/home", auth,  uC.updateLocation);
// uR.get("/home", auth, uC.getHome);
// uR.get("/location", auth, uC.getAll);
// uR.post("/friend/:id", auth, uC.sendFriendRequest);
// uR.post("/friend/accept/:id", auth, uC.acceptFriendRequest);
hR.post("/match", auth, hC.matchHospital)
hR.get('/', auth, hC.getAllHospitals)

export default hR;
