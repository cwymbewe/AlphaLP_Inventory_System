import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectToMongoDB from './config/db';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import stockRoutes from './routes/stockRoutes';
import path from 'path';
dotenv.config();
// Connect to MongoDB
connectToMongoDB();
// Initialize Express app
const app = express();
// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} [${new Date().toISOString()}]`);
    next();
});
// Test API routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});
// Serve static files from the frontend build directory
app.use(express.static(path.join(process.cwd(), 'frontend/react/dist')));
console.log('Registering user routes...');
app.use('/api/users', userRoutes);
app.use('/api/stock', stockRoutes);
console.log('User routes registered successfully.');
// Error handling
app.use(errorHandler);
// Port
const port = process.env.PORT || 3000;
// Start server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});
