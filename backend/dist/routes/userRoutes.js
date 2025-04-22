import express from 'express';
import { getUser } from '../getUser';
import { addUser } from '../addUser';
import jwt from 'jsonwebtoken';
const router = express.Router();
// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userResult = await getUser(email);
    const user = userResult ?? null;
    if (user && await user.comparePassword(password)) {
        // Generate token and send response
        const token = generateToken(user);
        res.status(200).json({ token, user });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};
// Route for user registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const result = await addUser(name, email, password);
    if (result.success) {
        res.status(201).json({ message: result.message });
    }
    else {
        res.status(400).json({ message: result.message });
    }
});
export default router;
