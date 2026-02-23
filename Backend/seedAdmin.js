const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


const seedAdmin = async () => {
    try {
        await connectDB(); 
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name: 'IndranilGreenAI',
                email: 'indranil.greenaiservices@gmail.com',
                password: 'ChangeMe123!', 
                role: 'admin',
                needsPasswordChange: true, 
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error(error);
    } finally {
        
        mongoose.disconnect();
        process.exit();
    }
};

seedAdmin();
