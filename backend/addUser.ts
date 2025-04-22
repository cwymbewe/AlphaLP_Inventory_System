import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

let isConnected = false;

export const addUser = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        isConnected = true;
    }
    let responseMessage = "";
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        console.log('User added successfully');
        responseMessage = 'User added successfully';
        return { success: true, message: responseMessage };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error adding user: ${error.message}`);
            responseMessage = `Error adding user: ${error.message}`;
        } else {
            console.error('Unknown error adding user');
            responseMessage = 'Unknown error adding user';
        }
        return { success: false, message: responseMessage };
    }
};
