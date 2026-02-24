const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        default: null, // Null for old users
    },
    organizationName: {
        type: String,
        default: null, // Null for old users
    },
    designation: {
        type: String,
        default: null,
    },
    sector: {
        type: String,
        enum: ['Enterprise', 'Government', 'Corporate', 'Startup', 'Other', null],
        default: null,
    },
    password: {
        type: String,
        required: function () { return !this.googleId && !this.facebookId; }, // Only required if not Google or Facebook Login
        select: false,
    },
    googleId: {
        type: String,
        sparse: true, // Allows multiple nulls for non-Google users
    },
    facebookId: {
        type: String,
        sparse: true, // Allows multiple nulls for non-Facebook users
    },
    role: {
        type: String,
        enum: ['client', 'admin', 'sales', 'hr'],
        default: 'client',
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

// Hash password only if it's modified and exists
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Method to verify password
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);