
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const PlatformUser = require('./models/PlatformUser');

async function test() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('Creating user...');
        const user = await PlatformUser.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test' + Date.now() + '@test.com',
            phone: '1234567890',
            organizationName: 'Test Org',
            designation: 'Tester',
            sector: 'Enterprise',
            password: 'password123'
        });
        console.log('User created successfully:', user.email);
        process.exit(0);
    } catch (error) {
        console.error('ERROR OCCURRED:');
        console.error('Message:', error.message);
        if (error.errors) {
            console.error('Validation Errors:', JSON.stringify(error.errors, null, 2));
        }
        process.exit(1);
    }
}

test();
