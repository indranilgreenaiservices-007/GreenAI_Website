const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Ensure DB connects before seeing if user exists
const seedAdmin = async () => {
    try {
        await connectDB(); // Wait for connection

        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name: 'IndranilGreenAI',
                email: 'indranil.greenaiservices@gmail.com',
                password: 'ChangeMe123!', // Initial Admin Password
                role: 'admin',
                needsPasswordChange: true, // Also force admin to change default password
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Disconnect to exit process cleanly
        mongoose.disconnect();
        process.exit();
    }
};

seedAdmin();
