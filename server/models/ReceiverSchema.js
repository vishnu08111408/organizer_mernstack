import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  phone: {
    type: Number,
    required: true,
    unique:true,
  },
  otp: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  organ: [{
    name: String,
    expiry_date: Date,
    status : {
      type : String,
      default : "sent"
    }
  }],
  tissue: [String],
  blood_group: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  health_history: String,
  condition: {
    type: String,
    required: false,
  },
  wait_time : {
    type: String,
    required: false,
  },
  fcm_token: {
    type: String,
    required: false,
  },
});

const Receiver = mongoose.model("receiver", receiverSchema);

export default Receiver;
