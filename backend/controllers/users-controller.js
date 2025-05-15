import { validationResult } from "express-validator";
import HttpError from "../util/http-error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const getUsers = async (req, res, next) => {
    let users;
    try {
      users = await User.find(); 
    } catch (err) {
      return next(new HttpError("Échec de récupération des utilisateurs", 500));
    }
  
    res.status(200).json({
      users: users.map(user => user.toObject({ getters: true }))
    });
  };
  
const signUp = async (req, res, next) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        return next(new HttpError("Données entrées invalides", 422));
    }
    const {username, password, favoriteTeam, profilePic, followers, following, biographie, posts} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({username})
        if(existingUser) {
            const error = new HttpError("Nom d'utilisateur deja utilisé.", 422);
            return next(error);
        }

    } catch (err) {
        const error = new HttpError("La création de l'utilisateur a échoué, veuillez réessayer plus tard.", 500);
        return next(error);
    }

    const createdUser = new User({
        username,
        password,
        favoriteTeam,
        profilePic,
        followers,
        following,
        biographie,
        posts
    })
    try {
        await createdUser.save();
      } catch (err) {
        return next(new HttpError("Création de l'utilisateur échouée.", 500));
      }
    
    let token;
    try {
        token =  jwt.sign(
            {userId: createdUser.id, username: createdUser.username},
            "secretKey",
            {expiresIn: "1h"}
        );

    } catch (err) {
        const error = new HttpError("La création du utilisateur a été echoué, veuillez reessayez plus tard.", 500)
        return next(error)
    }
    res.status(201).json({ createdUser: createdUser.toObject({ getters: true })
    });

    
};

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username, password})
    } catch (err) {
        return next(new HttpError("La connexion a échoué, veuillez réessayer plus tard.", 500));
    }
    if (!existingUser) {
        const error = new HttpError("Identifiants invalides, impossible de se connecter.", 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, username: existingUser.username },
            "secretKey",
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError(
            "Creation du token a echouée.",
            500
        );
        return next(error);
    }

    res.status(200).json({
        message: "Utilisateur connecté avec succès!", 
        userId: existingUser.id,
        username: existingUser.username,
        favoriteTeam: existingUser.favoriteTeam,
        token: token,
    });
};
const updateUser = async (req, res, next) => {
    const userId = req.params.uid;
    const { username, biographie } = req.body;
  
    let user;
    try {
      user = await User.findById(userId);
      if (!user) {
        return next(new HttpError("Utilisateur non trouvé", 404));
      }
    } catch (err) {
      return next(new HttpError("Erreur lors de la recherche de l'utilisateur", 500));
    }
  
    if (username) user.username = username;
    if (biographie) user.biographie = biographie;
  
    try {
      await user.save();
    } catch (err) {
        console.error("❌ Erreur lors du save:", err); // <-- important

      return next(new HttpError("Erreur lors de la mise à jour de l'utilisateur", 500));
    }
  
    res.status(200).json({ user: user.toObject({ getters: true }) });
  };
  
export default {
    signUp,
    loginUser,
    getUsers,
    updateUser
};