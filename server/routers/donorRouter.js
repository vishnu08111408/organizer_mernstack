import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import DonorController from '../controllers/donorController.js';
dotenv.config()

const dR = express.Router();

const dC = new DonorController();

// uR.post("/home", auth,  uC.updateLocation);
// uR.get("/home", auth, uC.getHome);
// uR.get("/location", auth, uC.getAll);
// uR.post("/friend/:id", auth, uC.sendFriendRequest);
// uR.post("/friend/accept/:id", auth, uC.acceptFriendRequest);
dR.post("/addDateTo", dC.addDateTo);
dR.get('/', dC.getAllDonors)
dR.get("/profile", dC.profile);
dR.post("/organ-reduction", dC.organReduction);

export default dR;
