
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    jobTitle: { type: String, required: true }, // The job they applied for
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Link to actual Job if possible
    department: String,

    // Professional Details
    experienceYears: { type: Number, default: 0 },
    currentCompany: String,
    currentRole: String,
    currentSalary: String,

    // Documents
    resumeLink: { type: String, required: true },
    linkedInProfile: String,
    portfolioLink: String,
    coverLetter: String,

    // Status & Process
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Interviewing"],
        default: "Pending"
    },
    appliedAt: { type: Date, default: Date.now },

    // Interview Details
    interviewDate: String, // Kept as string for simplicity as per frontend logic (YYYY-MM-DD)
    interviewTime: String,
    mode: { type: String, enum: ["Virtual", "On-site"] },
    link: String,
    mailSent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Application', ApplicationSchema);
