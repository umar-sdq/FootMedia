import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteTeam: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  biographie: { type: String, default: "" },
  posts: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Post',
    required: true 
  }]
});

export default mongoose.model("User", userSchema);
