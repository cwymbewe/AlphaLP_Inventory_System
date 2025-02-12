import express from 'express';
import { getUser } from '../getUser.js';
import { addUser } from '../addUser.js'; // Corrected import statement

const router = express.Router();

import jwt from 'jsonwebtoken'; // Import JWT for token generation

// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (user && await user.comparePassword(password)) {
        // Generate token and send response
        const token = generateToken(user); // Generate token
        res.status(200).json({ token, user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });
};

// Route for user registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const result = await addUser(name, email, password);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

export default router;
