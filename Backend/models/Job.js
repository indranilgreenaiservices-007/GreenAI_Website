
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Kolkata"
    },
    employmentType: {
        type: String,
        default: "Full-time"
    },
    experience: String,
    education: String,
    salary: String,
    description: String,
    roleOverview: String,
    responsibilities: String,
    skills: String,
    offers: String,
    status: {
        type: String,
        default: "OPEN",
        enum: ["OPEN", "CLOSED"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', JobSchema);
