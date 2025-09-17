import mongoose from "mongoose";

const ehrSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    problems: [{
        name: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    allergies: [{
        substance: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    medications: [{
        name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: false // optional, if you want to capture dosage details
        },
        frequency: {
            type: String,
            required: false // optional, e.g., "Once a day", "Twice a day"
        }
    }],
    surgeries: [{
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
    vitals: {
        height: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        temperature: {
            type: Number,
            required: true
        },
        bp: {
            systolic: {
                type: Number,
                required: true
            },
            diastolic: {
                type: Number,
                required: true
            }
        },
        pulse: {
            type: Number,
            required: true
        },
        spo2: {
            type: Number,
            required: true
        }
    }
});

const EHR = mongoose.model("ehr", ehrSchema);

export default EHR;
