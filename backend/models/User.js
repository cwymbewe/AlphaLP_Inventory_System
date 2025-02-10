import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: { 
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    }
});

export default mongoose.model("User", userSchema);
