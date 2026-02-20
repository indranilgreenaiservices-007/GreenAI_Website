
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const debugUsers = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        const users = await User.find({});
        console.log(`Found ${users.length} users.`);

        if (users.length === 0) {
            console.log('No users found! Attempting to create user...');
            try {
                const newUser = await User.create({
                    name: 'IndranilGreenAI',
                    email: 'indranil.greenaiservices@gmail.com',
                    password: 'ChangeMe123!',
                    role: 'admin',
                    needsPasswordChange: true,
                });
                console.log('User created:', newUser.email);
            } catch (createError) {
                console.error('CREATE FAILED!');
                console.error('Message:', createError.message);
                console.error('Code:', createError.code); // Duplicate key code is 11000
                if (createError.keyPattern) console.error('Key Pattern:', createError.keyPattern);
            }
        } else {
            users.forEach(u => {
                console.log(`- Email: ${u.email}`);
            });
        }

    } catch (error) {
        console.error('General Error:', error.message);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

debugUsers();
