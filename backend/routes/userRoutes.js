import express from 'express';
import rateLimit from 'express-rate-limit'; // Import rate limiting
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router(); // Create a new router instance

// Rate limiting for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: "Too many login attempts from this IP, please try again later."
});

const validateInput = (req, res, next) => {
    const { email, password } = req.body; // Removed name from validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    next();
};

router.post('/register', validateInput, async (req, res) => { // Register a new user
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ email, password: hashedPassword }); // Removed name from user creation
        res.json({ message: "User created successfully", user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login user with rate limiting
router.post('/login', loginLimiter, async (req, res) => { // Login user with rate limiting
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" }); // Check if user exists

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT secret is not defined." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
