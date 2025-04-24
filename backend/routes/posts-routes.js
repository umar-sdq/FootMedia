import express from 'express'
import {check} from 'express-validator'
import postsController from '../controllers/posts-controller.js'
const router = express.Router()

router.get("/", postsController.getPosts);

router.get("/:postId", postsController.getPostById);

router.get("/user/:userId", postsController.getPostByUserId)


router.post(
    "/", postsController.createPost
);

router.patch(
    "/:jid", postsController.updatePost
);

router.delete("/:jid", postsController.deletePost);

export default router;
