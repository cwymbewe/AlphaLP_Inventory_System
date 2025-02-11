import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 }, // Minimum length for name
    email: { type: String, required: true, unique: true, lowercase: true }, // Ensure email is lowercase
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: { 
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    }
});

// Hash password before saving
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12); // Increased cost factor
    }
    next();
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
userSchema.path("email").validate(function(value) {
    return emailRegex.test(value);
}, "Invalid email format");

// Indexing the email field for faster lookups
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);