import { validationResult } from 'express-validator';
import HttpError from '../util/http-error.js';
import Post from '../models/post.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

const getPosts = async (req, res, next) => {
  const posts = await Post.find().exec();
  if (!posts) {
    return next(new HttpError('Aucune publication', 404));
  }
  res.json(posts.map(post => post.toObject({ getters: true })));
};

const getPostById = async (req, res, next) => {
  const postId = req.params.postId;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return next(new HttpError('Erreur de récupération de la publication', 500));
  }
  if (!post) {
    return next(new HttpError('Publication introuvable', 404));
  }
  res.json({ posts: post.toObject({ getters: true }) });
};

const getPostByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let postsForUser;
  try {
    postsForUser = await Post.find({ userId: userId });
  } catch (err) {
    return next(new HttpError('Erreur de récupération des publications pour le user', 500));
  }
  if (!postsForUser) {
    return next(new HttpError('Publications introuvables pour le user', 404));
  }
  res.json({ posts: postsForUser.map(post => post.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Données entrées invalides.', 422));
  }

  const { userId, caption, image, location } = req.body;

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Utilisateur non trouvé.', 404));
    }
  } catch (err) {
    return next(new HttpError('Erreur lors de la recherche de l\'utilisateur.', 500));
  }

  const createdPost = new Post({
    userId,
    caption,
    image,
    location,
    username: user.username,
    favoriteTeam: user.favoriteTeam,
    likes: [],
    comments: [],
    creationTime: Date.now()
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPost.save({ session });
    user.posts.push(createdPost);
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError('Erreur lors de la création du post.', 500));
  }

  res.status(201).json({ post: createdPost.toObject({ getters: true }) });
};

const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { caption } = req.body;

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
  } catch (err) {
    return next(new HttpError('Erreur de mise à jour de la publication', 500));
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  let post;

  try {
    post = await Post.findById(postId).populate('userId');
    if (!post) {
      return next(new HttpError('Publication introuvable', 404));
    }
  } catch (err) {
    return next(new HttpError('Erreur de recherche du post', 500));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await Post.findByIdAndDelete(postId, { session });

    await session.commitTransaction();
    res.status(200).json({ message: 'Publication supprimée' });
  } catch (err) {
    return next(new HttpError('Erreur de suppression de la publication', 500));
  }
};



export default {
  getPosts,
  getPostById,
  getPostByUserId,
  createPost,
  updatePost,
  deletePost
};
