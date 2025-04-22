import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  userRole?: string;
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    console.log('Authenticating user...');
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token received:', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        if (decoded && typeof decoded !== 'string' && 'id' in decoded) {
            req.userId = (decoded as JwtPayload).id as string;
            console.log('User authenticated:', req.userId);
        } else {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
        next();
    });
};
