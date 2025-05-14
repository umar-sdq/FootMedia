import express from 'express'
import {check} from 'express-validator'
import usersController from '../controllers/users-controller.js'
const router = express.Router()

router.post("/signup",
    [
        check("username").not().isEmpty(),
        check("password").isLength({min: 6}),
    ],
    usersController.signUp
);

router.post("/login", usersController.loginUser);
router.get("/", usersController.getUsers)
export default router; 