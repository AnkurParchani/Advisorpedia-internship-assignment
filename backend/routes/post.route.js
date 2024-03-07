import express from "express";

import * as postController from "../controllers/post.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

// For signup and login request
router.route("/:pageId").get(authController.protect, postController.getPosts);

export default router;
