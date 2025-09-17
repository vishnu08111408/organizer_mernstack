import mongoose from "mongoose";
import admin from "firebase-admin";

import serviceAccount from "../secrets/firebase-admin.json" assert { type: "json" };
import Receiver from "../models/ReceiverSchema.js";
import EHR from "../models/EHRSchema.js";

class UserController {
    constructor() {
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     // databaseURL: ""
        // });
    }

    sendNotification = async (req, res) => {
        try {
            const { uid, title, body, latitude, longitude } = req.body;
            console.log(req.body)
            const user = await Receiver.findById(uid);
            console.log(user.fcm_token)
            if (user) {
                let message = {
                    notification: { title: title, body: body }, token: user.fcm_token, data: { "latlng": `${latitude},${longitude}` }
                };
                console.log(message)
                const response = await admin.messaging().send(message)
                console.log(response);
                res.status(200).send({ message: "Notification sent" });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (error) {

        }
    }

    test = async (req, res) => {
        try {
            const ehrData = req.body;

            const newEHR = new EHR(ehrData);
            await newEHR.save();

            res.status(201).send({ message: 'EHR record successfully added!' });
        } catch (error) {
            res.status(500).send({ message: 'Error inserting EHR record', error: error.message });
        }
    }


}

export default UserController;