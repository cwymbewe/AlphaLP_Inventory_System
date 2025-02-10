import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

connectToMongoDB();

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Import routes
import userRoutes from './routes/userRoutes.js';
import stockRoutes from './routes/stockRoutes.js'; // Import stock routes

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', stockRoutes); // Ensure routes are correctly set up

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error'); // Improved error handling
});

// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
