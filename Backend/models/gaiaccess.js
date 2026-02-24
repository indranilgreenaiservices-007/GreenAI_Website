const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const gaiaccessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'hr', 'employee'],
        default: 'employee',
    },
    needsPasswordChange: {
        type: Boolean,
        default: true, // Default to true so new users must change password
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

// Hash password before saving
gaiaccessSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Method to verify password
gaiaccessSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('gaiaccess', gaiaccessSchema);
