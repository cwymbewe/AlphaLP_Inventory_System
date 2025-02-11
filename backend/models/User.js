import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt

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

userSchema.pre("save", async function(next) { // Hash password before saving
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
userSchema.path("email").validate(function(value) {
    return emailRegex.test(value);
}, "Invalid email format");

export default mongoose.model("User", userSchema);
