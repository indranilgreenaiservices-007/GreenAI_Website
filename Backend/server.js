
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Import Route handlers
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const hrRoutes = require('./routes/hrRoutes');

// Import Middleware
const { protect } = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

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

// Admin Routes (Protected)
app.use('/api/admin', protect, adminRoutes);

// HR Routes (Protected internally, but good to be explicit or leave it to router)
// hrRoutes uses `router.use(protect)` internally so it's safe.
app.use('/api/hr', hrRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0',() => console.log(`Server running on port ${PORT}`));
