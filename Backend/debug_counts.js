
const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const now = new Date();
    // Use yesterday 00:00:00 to see if they are "recent"
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const count = await User.countDocuments({ createdAt: { $gte: todayStart } });
    console.log('Today (Feb 24) count:', count);

    const yesterday = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
    const countYesterday = await User.countDocuments({ createdAt: { $gte: yesterday, $lt: todayStart } });
    console.log('Yesterday (Feb 23) count:', countYesterday);

    process.exit();
}
check();
