const path = require('path');
const dotenv = require('dotenv');
// Load environment variables immediately
dotenv.config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Import Route handlers
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const hrRoutes = require('./routes/hrRoutes');

// Import Middleware
const { protect } = require('./middleware/authMiddleware');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Routes
// Authentication (Login/Register)
app.use('/api/auth', authRoutes);

// Admin Routes (Protected by route defined middleware)
app.use('/api/admin', adminRoutes);

// HR Routes (Protected internally, but good to be explicit or leave it to router)
// hrRoutes uses `router.use(protect)` internally so it's safe.
app.use('/api/hr', hrRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
