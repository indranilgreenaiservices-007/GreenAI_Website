const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/user.model'); 
require('dotenv').config();

const migrate = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB.");

        // --- STEP 1: FORCE DROP INDEXES ---
        console.log("Cleaning up old indexes...");
        try {
            const collection = mongoose.connection.db.collection('users');
            await collection.dropIndex("googleId_1");
            console.log("🗑️ Dropped googleId_1");
        } catch (e) {
            console.log("ℹ️ googleId_1 index didn't exist or already dropped.");
        }

        try {
            const collection = mongoose.connection.db.collection('users');
            await collection.dropIndex("facebookId_1");
            console.log("🗑️ Dropped facebookId_1");
        } catch (e) {
            console.log("ℹ️ facebookId_1 index didn't exist or already dropped.");
        }

        // --- STEP 2: LOAD DATA ---
        const jsonPath = path.join(__dirname, 'greenai.users.json');
        if (!fs.existsSync(jsonPath)) {
            console.error(`❌ Error: File NOT found at ${jsonPath}`);
            process.exit(1);
        }

        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const users = JSON.parse(rawData);
        console.log(`Parsed ${users.length} users from JSON file.`);

        // --- STEP 3: MIGRATE ---
        let count = 0;
        for (const data of users) {
            const mappedUser = {
                name: data.name || "Unknown",
                email: data.email,
                password: data.password,
                phone: data.phone || null,
                organizationName: data.organizationName || null,
                designation: data.designation || null,
                sector: data.sector || null,
                role: data.role || (data.isAdmin ? 'admin' : (data.isHr ? 'hr' : 'client')),
                isVerified: data.isVerified || data.verified || false,
                isActive: data.isActive !== undefined ? data.isActive : true,
                createdAt: data.createdAt?.$date ? new Date(data.createdAt.$date) : (data.createdAt || new Date())
            };

            // CRITICAL: We DO NOT set these to null. 
            // We either include them if they exist, or keep them UNDEFINED.
            // MongoDB Sparse indexes ignore missing fields, but they DO NOT ignore nulls.
            if (data.googleId) mappedUser.googleId = data.googleId;
            if (data.facebookId) mappedUser.facebookId = data.facebookId;

            if (!mappedUser.email) continue;

            // Use findOneAndUpdate with $set. 
            // This replaces data but won't touch fields we didn't define.
            await User.findOneAndUpdate(
                { email: mappedUser.email }, 
                { $set: mappedUser }, 
                { 
                    upsert: true, 
                    returnDocument: 'after', 
                    runValidators: false 
                }
            );
            count++;
        }
        
        console.log(`\n✨ Success! ${count} users migrated without index errors.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Fatal Error:", err);
        process.exit(1);
    }
};

migrate();