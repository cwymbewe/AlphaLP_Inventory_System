import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Ensure dotenv is imported
import User from './models/User.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';
dotenv.config(); // Load environment variables from .env file
let isConnected = false; // Variable to track connection status
export const addUser = async (name, email, password) => {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true; // Set connection status to true
    }
    let responseMessage = ""; // Variable to store response message
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save(); // Save the new user
        console.log('User added successfully'); // Log success message
        responseMessage = 'User added successfully'; // Set success message
        return { success: true, message: responseMessage }; // Return success response
    }
    catch (error) {
        console.error(`Error adding user: ${error.message}`); // Log error message
        responseMessage = `Error adding user: ${error.message}`; // Set error message
        return { success: false, message: responseMessage }; // Return error response
    }
};
// Replace with your desired user details
// addUser('Admin', 'info@alphalpgas.co.za', 'Shaydencp@2018');
