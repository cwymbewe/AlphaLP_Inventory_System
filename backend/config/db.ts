import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected...');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error connecting to MongoDB:', err.message);
    } else {
      console.error('Unknown error connecting to MongoDB');
    }
    process.exit(1);
  }
};

export default connectToMongoDB;
