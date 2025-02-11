import mongoose from 'mongoose';
import User from './models/User.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';

const addUser = async (name, email, password) => {
    try {
        await mongoose.connect('mongodb+srv://alphaLPGas:alphalpgas@cluster0.zylsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        console.log('User added successfully:', user);
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Replace with your desired user details
addUser('Admin', 'info@alphalpgas.co.za', 'Shaydencp@2018');
