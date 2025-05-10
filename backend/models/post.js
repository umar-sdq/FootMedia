import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    caption: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    likes: [{ type: String }],
    comments: [{ type: String }],
    creationTime: { type: Date, default: Date.now },
    favoriteTeam: { type: String },
});

export default mongoose.model('Post', postSchema);