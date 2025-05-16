"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../validators/auth");
const router = (0, express_1.Router)();
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", auth_2.validateRegister, auth_1.registerUser);
/**
 * @route POST /api/auth/login
 * @desc Authenticate user
 * @access Public
 */
router.post("/login", auth_2.validateLogin, auth_1.loginUser);
exports.default = router;
