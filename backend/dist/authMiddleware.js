import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    console.log('Authenticating user...'); // Log authentication attempt
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    console.log('Token received:', token); // Log the received token
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id; // Save user ID for use in other routes
        console.log('User authenticated:', req.userId); // Log authenticated user ID
        next(); // Proceed to the next middleware or route handler
    });
};
