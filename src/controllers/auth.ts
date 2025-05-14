import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, walletAddress } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({ email, password, name, walletAddress });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      userId: user.id,
      walletAddress: user.walletAddress,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
