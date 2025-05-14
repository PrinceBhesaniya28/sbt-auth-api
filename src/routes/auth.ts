import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { validateRegister, validateLogin } from "../validators/auth";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", validateRegister, registerUser);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user
 * @access Public
 */
router.post("/login", validateLogin, loginUser);

export default router;
