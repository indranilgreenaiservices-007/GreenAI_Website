const express = require('express');
const router = express.Router();
const User = require('../models/gaiaccess');
const PlatformUser = require('../models/user.model');
const { protect, admin } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all administrative users (employees)
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Get platform user statistics
// @route   GET /api/admin/platform-user-stats
// @access  Private/Admin
router.get('/platform-user-stats', protect, admin, async (req, res) => {
    try {
        const now = new Date();
        const last7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        const last30Days = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        const todayStart = new Date(now.setHours(0, 0, 0, 0));

        const totalUsers = await PlatformUser.countDocuments();
        const activeUsers7d = await PlatformUser.countDocuments({
            lastLogin: { $gte: last7Days }
        });
        const newRegistrationsToday = await PlatformUser.countDocuments({
            createdAt: { $gte: todayStart }
        });
        const inactiveUsers30d = await PlatformUser.countDocuments({
            $or: [
                { lastLogin: { $lt: last30Days } },
                { lastLogin: { $exists: false } }
            ]
        });

        // Users by Sector (Pie Chart data)
        const sectorStats = await PlatformUser.aggregate([
            { $group: { _id: '$sector', count: { $sum: 1 } } }
        ]);

        // User Growth Over Time (Line Chart data)
        const growthStats = await PlatformUser.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json({
            totalUsers,
            activeUsers7d,
            newRegistrationsToday,
            inactiveUsers30d,
            sectorStats,
            growthStats
        });
    } catch (error) {
        console.error('Error fetching platform user stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get all platform users
// @route   GET /api/admin/platform-users
// @access  Private/Admin
router.get('/platform-users', protect, admin, async (req, res) => {
    try {
        const users = await PlatformUser.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Create new user
// @route   POST /api/admin/create-user
// @access  Private/Admin
router.post('/create-user', protect, admin, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password, // Hash middleware handles this
            role,
            needsPasswordChange: true, // Force password change for new users
        });

        if (user) {
            // Determine the frontend URL based on the request origin or environment variable
            const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:5173';

            // Send email with credentials
            try {
                const message = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2e7d32;">Welcome to GreenAI Internal Portal</h2>
                        <p>Hello <strong>${user.name}</strong>,</p>
                        <p>An account has been created for you with the following details:</p>
                        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                            <p style="margin: 5px 0;"><strong>Role:</strong> ${user.role}</p>
                            <p style="margin: 5px 0;"><strong>Temporary Password:</strong> <code style="background-color: #eee; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
                        </div>
                        <p>Please log in immediately and change your password:</p>
                        <a href="${frontendUrl}/login" style="display: inline-block; background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Portal</a>
                        <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">If you did not request this account, please contact the administrator.</p>
                    </div>
                `;

                await sendEmail({
                    email: user.email,
                    subject: 'GreenAI Portal Access - Your Credentials',
                    message,
                });

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    message: 'User created and email sent successfully',
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    message: 'User created, but email failed to send. Please share credentials manually.',
                });
            }
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error during user creation', error: error.message });
    }
});

// @desc    Update user role or delete
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
router.put('/users/:id', protect, admin, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        // Admin can reset 'needsPasswordChange' if needed? Generally no.

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (user) {
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});

module.exports = router;
