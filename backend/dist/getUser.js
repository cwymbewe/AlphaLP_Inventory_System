import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config(); // Adjust the path as necessary
export const getUser = async (email) => {
    let userFound = false; // Variable to track if user is found
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email });
        if (user) {
            userFound = true; // Set userFound to true if user is found
            return user; // Return the user object
        }
        else {
            return null; // Return null if user is not found
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
    }
    finally {
        // Only close the connection if it was opened
        if (mongoose.connection.readyState === 1) {
            mongoose.connection.close();
        }
    }
};
// Replace with the email of the user you want to check
// getUser('info@alphalpgas.co.za');
