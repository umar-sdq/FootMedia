import { validationResult } from "express-validator";
import HttpError from "../util/http-error.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

let USERS = [];

const getUsers = (req, res, next) => {
    res.json({ USERS });
};

const signUp = (req, res, next) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        return next(new HttpError("Données entrées invalides", 422));
    }
    const {username, password} = req.body;
    const createdUser = {
        id: uuidv4(),
        username,
        password
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
    USERS.push(createdUser);
    res.status(201).json({
        userId: createdUser.id,
        username: createdUser.username,
        token: token
    });

    
};

const loginUser = (req, res, next) => {
    const { username, password } = req.body;
    const utilisateurLogin = USERS.find((u) => u.username === username && u.password === password);

    if (!utilisateurLogin) {
        const error = new HttpError("Identifiants invalides, impossible de se connecter.", 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: utilisateurLogin.id, username: utilisateurLogin.username },
            "cleSuperSecrete!",
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError(
            "La connexion de l'utilisateur a échoué, veuillez réessayer plus tard.",
            500
        );
        return next(error);
    }

    res.status(200).json({
        message: "Utilisateur connecté avec succès!", 
        userId: utilisateurLogin.id,
        username: utilisateurLogin.username,
        token: token,
    });
};

export default {
    signUp,
    loginUser,
    getUsers
};