import express from "express";

import * as userController from "../controllers/user.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

// For signup and login request
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

// Middleware to ensure that the user is logged in
router.use(authController.protect);

// Protected Requests
router.route("/").get(userController.getUser);

export default router;
