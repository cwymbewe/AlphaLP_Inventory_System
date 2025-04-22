import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 }, // Minimum length for name
    email: { type: String, required: true, lowercase: true }, // Ensure email is lowercase
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});
// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12); // Increased cost factor
    next();
});
// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
userSchema.path("email").validate(function (value) {
    return emailRegex.test(value);
}, "Invalid email format");
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model("User", userSchema);
