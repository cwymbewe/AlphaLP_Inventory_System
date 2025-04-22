import express, { Request, Response } from 'express';
import { getUser } from '../getUser';
import { addUser } from '../addUser';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface User {
  _id: string;
  email: string;
  comparePassword(password: string): Promise<boolean>;
}

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userResult = await getUser(email);
    const user: User | null = userResult ?? null;
    if (user && await user.comparePassword(password)) {
        // Generate token and send response
        const token = generateToken(user);
        res.status(200).json({ token, user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const generateToken = (user: User): string => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
};

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const result = await addUser(name, email, password);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

export default router;
