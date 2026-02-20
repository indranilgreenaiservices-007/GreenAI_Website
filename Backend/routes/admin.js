const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Create new user
// @route   POST /api/admin/create-user
// @access  Private/Admin
router.post('/create-user', protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password, // Hash middleware handles this
        role,
        needsPasswordChange: true, // Force password change for new users
    });

    if (user) {
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
                    <a href="http://localhost:5173/login" style="display: inline-block; background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Portal</a>
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
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
