import { Request, Response } from "express";
import SBT from "../models/SBT";
import User from "../models/User";
import { ethers } from "ethers";
import {
  SBT_CONTRACT_ADDRESS,
  PROVIDER_URL,
  ADMIN_WALLET_PRIVATE_KEY,
} from "../config";

export const issueSBT = async (req: Request, res: Response) => {
  try {
    const { userId, creatorType, tokenURI } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user already has an SBT
    const existingSBT = await SBT.findOne({ userId });
    if (existingSBT) {
      return res.status(400).json({ error: "User already has an SBT" });
    }

    // Here you would interact with your smart contract
    // This is a simplified example
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(ADMIN_WALLET_PRIVATE_KEY, provider);

    // In a real implementation, you would have your SBT contract ABI here
    // const sbtContract = new ethers.Contract(SBT_CONTRACT_ADDRESS, SBT_ABI, wallet);
    // const tx = await sbtContract.mint(user.walletAddress, tokenURI);

    // For demo purposes, we'll simulate a transaction hash
    const transactionHash = ethers.utils.keccak256(
      ethers.utils.randomBytes(32)
    );

    // Create SBT record in database
    const sbt = new SBT({
      userId,
      creatorType,
      tokenURI,
      transactionHash,
      issuedAt: new Date(),
    });

    await sbt.save();

    // Update user role if needed
    if (user.role === "user") {
      user.role = creatorType.toLowerCase(); // e.g., 'designer', 'artist', etc.
      await user.save();
    }

    res.status(201).json({
      sbtId: sbt.id,
      transactionHash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to issue SBT" });
  }
};
