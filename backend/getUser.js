import mongoose from 'mongoose';
import User from './models/User.js'; // Adjust the path as necessary

const getUser = async (email) => {
    try {
        await mongoose.connect('mongodb+srv://alphaLPGas:alphalpgas@cluster0.zylsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findOne({ email });
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Replace with the email of the user you want to check
getUser('info@alphalpgas.co.za');
