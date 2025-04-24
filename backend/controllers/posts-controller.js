import {validationResult} from 'express-validator';
import HttpError from '../util/http-error.js';
import Post from '../models/post.js';

const getPosts = async (req, res, next) => {
    const posts = await Post.find().exec();
    if (!posts) {
        return next(new HttpError('Aucune publication', 404));
    }
    res.json(posts);
}

const getPostById = async (req, res, next) => {
    const postId = req.params.postId;
    let post;
    try {
        post = await Post.findById(postId)
    }
    catch (err) {
        return next(new HttpError('Erreur de récupération de la publication', 500));
    }
    if (!post) {
        return next(new HttpError('Publication introuvable', 404));
    }
    res.json({posts: post.toObject({ getters: true })});
}


const getPostByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    let postsForUser;
    try {
        postsForUser = await Post.find({ userId: userId })
    }
    catch (err) {
        return next(new HttpError('Erreur de récupération des publications pour le user', 500));
    }
    if (!postsForUser) {
        return next(new HttpError('Publications introuvables pour le user', 404));
    }
    res.json({posts: postsForUser.map(post => post.toObject({ getters: true }))});
}

const createPost = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError('Données entrées invalides.', 422));
    }
    const { userId, caption, image, location } = req.body; 
    const createdPost = new Post({
        userId,
        caption,
        image,
        location, 
        likes: [],
        comments: [],
        creationTime: Date.now()
    });
    try {
        await createdPost.save();
    }
    catch (err) {
        return next(new HttpError('Erreur de création de la publication', 500));
    }
    res.status(201).json({ post: createdPost.toObject({ getters: true }) });
}

const updatePost = async (req, res, next) => {
    const postId = req.params.postId;
    const {caption} = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { caption: caption },
            { new: true }
        );
        if (!updatedPost) {
            return next(new HttpError('Publication introuvable', 404));
        }
        res.status(200).json({ post: updatedPost.toObject({ getters: true }) });
    }
    catch (err) {
        return next(new HttpError('Erreur de mise à jour de la publication', 500));
    }
}
const deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return next(new HttpError('Publication introuvable', 404));
        }
        res.status(200).json({ message: 'Publication supprimée' });
    }
    catch (err) {
        return next(new HttpError('Erreur de suppression de la publication', 500));
    }
}   
export default {
    getPosts,
    getPostById,
    getPostByUserId,
    createPost,
    updatePost,
    deletePost
}