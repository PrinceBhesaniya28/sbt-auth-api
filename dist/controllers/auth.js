"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, walletAddress } = req.body;
        // Check if user exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Create new user
        const user = new User_1.default({ email, password, name, walletAddress });
        yield user.save();
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, config_1.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(201).json({
            userId: user.id,
            walletAddress: user.walletAddress,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Check password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, config_1.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            token,
            userId: user.id,
            role: user.role,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});
exports.loginUser = loginUser;
