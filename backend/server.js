import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Import routes
/*.......................
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
....................................*/
import userRoutes from './routes/userRoutes.js'; //
import stockRoutes from './routes/stockRoutes.js'; // Import post routes

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB with error handling
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
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
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));



