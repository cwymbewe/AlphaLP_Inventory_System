import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({name, email, password: hashedPassword});
        res.json({message: "User created successfully", user: newUser});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

// Login user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({error: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({error: "Invalid credentials"});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({message: "Login successful", token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;