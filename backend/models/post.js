import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  caption: { type: String, required: true },
  image: { type: String, default: "" },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  creationTime: { type: Date, default: Date.now },
}); 
export default mongoose.model("Post", postSchema);