import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
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
  nodal_officer_details:[{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
  }],
  location: {
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,   
        required: true,
    },
}
});

const Hospital = mongoose.model("hospital", hospitalSchema);

export default Hospital;
