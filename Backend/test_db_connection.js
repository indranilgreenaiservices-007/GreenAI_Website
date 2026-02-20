
const mongoose = require('mongoose');
require('dotenv').config();

const connectTest = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connection SUCCESS!');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB Connection FAILED!');
        console.error(error.message);
        process.exit(1);
    }
};

connectTest();
