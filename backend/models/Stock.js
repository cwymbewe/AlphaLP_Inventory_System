import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    item: String,
    quantity: Number,
    price: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model("Stock", stockSchema);