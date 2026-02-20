
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    Id: {
        type: String,
        unique: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    Phone: String,
    salary: String,
    joiningDate: { type: Date, required: true },

    // Classification
    employmentType: { type: String, default: 'Full-Time' },
    workArrangement: { type: String, default: 'On-Site' },
    compensationType: { type: String, default: 'Paid' },
    seniorityLevel: { type: String, default: 'Entry-Level' },

    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual property for yearsWorked
EmployeeSchema.virtual('yearsWorked').get(function () {
    if (!this.joiningDate) return 0;
    const diff = Date.now() - this.joiningDate.getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years * 10) / 10; // 1 decimal place
});

module.exports = mongoose.model('Employee', EmployeeSchema);
