import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

console.log('Current working directory:', process.cwd()); // Log the current working directory
dotenv.config(); // Load environment variables from .env file

console.log('Environment Variables:', process.env); // Log the entire process.env object


const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; // Ensure MONGO_URI is defined
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    await mongoose.connect(mongoUri, {
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
app.use('/api/stock', stockRoutes); // Ensure routes are correctly set up

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error'); // Improved error handling
});

// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
