import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    item: { type: String, required: true }, // Required field
    quantity: { 
        type: Number, 
        required: true, 
        min: 0 // Non-negative number
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 // Positive number
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model("Stock", stockSchema);
