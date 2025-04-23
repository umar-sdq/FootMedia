import { validationResult } from "express-validator";
import HttpError from "../util/http-error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

let USERS = [];

const getUsers = (req, res, next) => {
    res.json({ USERS });
};

const signUp = async (req, res, next) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        return next(new HttpError("Données entrées invalides", 422));
    }
    const {username, password, favoriteTeam} = req.body;

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
    console.log("🏁 Valeurs reçues dans le backend:", { username, password, favoriteTeam });

    const createdUser = new User({
        username,
        password,
        favoriteTeam
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
    res.status(201).json({
        userId: createdUser.id,
        username: createdUser.username,
        favoriteTeam: createdUser.favoriteTeam,
        token: token
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

export default {
    signUp,
    loginUser,
    getUsers
};