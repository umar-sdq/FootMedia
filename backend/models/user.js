import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
});

export default mongoose.model("User", userSchema);
