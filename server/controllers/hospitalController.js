import mongoose from "mongoose";
import Hospital from "../models/HospitalSchema.js";
import Donor from "../models/DonorSchema.js";
import Receiver from "../models/ReceiverSchema.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

class HospitalController {
    constructor() { }

    matchHospital = async (req, res) => {
        try {
            const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
            const apiKey = process.env.MAP_APIKEY;

            const hospital_id = req.userID;
            // console.log(hospital_id)
            // const { hospital_id, organ, expiry_hours } = req.body;
            const { organ, expiry_hours } = req.body;
            const expiry_time = expiry_hours * 60 * 60;
            // console.log(expiry_time);
            console.log(organ)
            const hospital = await Hospital.findById(hospital_id);
            // console.log(hospital);
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }
            const { location } = hospital;
            const { latitude, longitude } = location;

            // const receiver = await Receiver.find();
            const receiver = await Receiver.aggregate([
                {
                    $lookup: {
                        from: "ehrs",
                        localField: "phone",
                        foreignField: "phone",
                        as: "ehrData"
                    }
                }
            ]);
            console.log("Receiver: ", receiver);    
            // let receiverArr = receiver.filter((receiver) => {
            //     return receiver.organ.includes(organ);
            // });
            console.log("prg: ", organ);
            let receiverArr  = []
            for(let i=0; i<receiver.length; i++){
                console.log("Name: ", receiver[i].name)
                // console.log("Organ: ", receiver[i].organ.name)
                // if(receiver[i].organ.name == organ){
                //     console.log("Organ: ", receiver[i].organ.name)
                //     receiverArr.push(receiver[i])
                // }
                for(let j=0; j<receiver[i].organ.length; j++){
                    if(receiver[i].organ[j].name == organ){
                        console.log("Organ: ", receiver[i].organ[j].name)
                        receiverArr.push(receiver[i])
                    }
                }
            }
            

            console.log("Receiver Array: ", receiverArr)

            const filteredReceiverArr = await Promise.all(receiverArr.map(async (receiver) => {

                console.log(`Receiver: ${receiver.location.latitude}, ${receiver.location.longitude}`);

                let dur = await axios.get(apiUrl, {
                    params: {
                        origins: `${latitude},${longitude}`,
                        destinations: `${receiver.location.latitude},${receiver.location.longitude}`,
                        key: apiKey
                    }
                });
                console.log(dur.data.rows[0].elements[0].duration);

                if (!dur.data.rows[0] && !dur.data.rows[0].elements[0].duration) {
                    // return null; // Remove invalid entries.
                }
                console.log(`Name: ${receiver.name}`);
                console.log(`Duration: ${dur.data.rows[0].elements[0].duration}`);
                const durationValue = dur.data.rows[0].elements[0].duration ? dur.data.rows[0].elements[0].duration.value : null;
                console.log(`Duration Value: ${durationValue}`);
                console.log(`Expiry Time: ${expiry_time}`);

                const isWithinExpiry = durationValue < expiry_time;
                console.log(`Is Within Expiry: ${isWithinExpiry}`);

                if (isWithinExpiry) {
                    console.log("Within Expiry tt");

                    const test = {
                        ...receiver,
                        duration: durationValue // Include duration in the receiver object.
                    }

                    console.log("Test: ", test);

                    return {
                        ...receiver,
                        duration: durationValue // Include duration in the receiver object.
                    };
                }
                // return null;
            }));

            console.log("Filtered Receiver Array: ", filteredReceiverArr);
            
            // Remove null entries and sort by duration in ascending order.
            let finalReceiverArr = filteredReceiverArr.filter((receiver) => receiver !== null);
            finalReceiverArr.sort((a, b) => a.duration - b.duration);
            console.log("Final Receiver Array: ", finalReceiverArr);
            //send only ._doc
            // const rr = finalReceiverArr.map((receiver) => receiver._doc);
            // console.log("RR: ", rr);
            finalReceiverArr = filteredReceiverArr.filter((receiver) => receiver !== null);
            res.status(200).json(finalReceiverArr);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Get all hospitals
    getAllHospitals = async (req, res) => {
        try {
            const hospitals = await Hospital.find();
            res.status(200).json(hospitals);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

}

export default HospitalController;