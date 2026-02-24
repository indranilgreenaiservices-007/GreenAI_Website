const express = require('express');
const router = express.Router();
const PlatformUser = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new platform user
// @route   POST /api/platform-auth/register
// @access  Public
router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        organizationName,
        designation,
        sector,
        password
    } = req.body;

    try {
        const userExists = await PlatformUser.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await PlatformUser.create({
            name: `${firstName} ${lastName}`.trim(),
            email,
            phone,
            organizationName,
            designation,
            sector,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            stack: error.stack,
            errors: error.errors
        });
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Auth platform user & get token
// @route   POST /api/platform-auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await PlatformUser.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // Update last login
            user.lastLogin = Date.now();
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Google Auth login/register
// @route   POST /api/platform-auth/google
// @access  Public
router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const payload = userInfo.data;

        let user = await PlatformUser.findOne({ email: payload.email });
        if (!user) {
            user = await PlatformUser.create({
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                isVerified: true
            });
        } else if (!user.googleId) {
            user.googleId = payload.sub;
            await user.save();
        }

        user.lastLogin = Date.now();
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ message: 'Invalid Google Token' });
    }
});

// @desc    Facebook Auth login/register
// @route   POST /api/platform-auth/facebook
// @access  Public
router.post('/facebook', async (req, res) => {
    const { accessToken, userID } = req.body;
    try {
        const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
        const response = await axios.get(urlGraphFacebook);
        const { email, name, id } = response.data;

        let user = await PlatformUser.findOne({ email });

        if (!user) {
            user = await PlatformUser.create({
                name: name,
                email: email,
                facebookId: id,
                isVerified: true
            });
        } else if (!user.facebookId) {
            user.facebookId = id;
            await user.save();
        }

        user.lastLogin = Date.now();
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Facebook Auth Error:', error);
        res.status(401).json({ message: 'Invalid Facebook Token' });
    }
});

module.exports = router;
