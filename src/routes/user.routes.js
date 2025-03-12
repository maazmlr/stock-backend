import { Router } from "express";
import { forgotPassword, LoginUser, RegisterUser, resetPassword } from "../controllers/auth.controller.js";
const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/reset-password/:token", resetPassword);

export default router;
