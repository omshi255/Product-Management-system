import UserController from "../controllers/UserControlller.js";

import express from "express";

const router = express.Router();
// Register a new user
router.post("/register",UserController.register);
// // User login
router.post("/login", UserController.login);

router.delete('/logout', UserController.logout);

// // Update user profile

export default router;
