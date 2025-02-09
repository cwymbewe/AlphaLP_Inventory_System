import mongoose from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    role: { 
        type: String, 
        enum: ["admin", "user"],
    }
});

export default mongoose.model("User", userSchema);
