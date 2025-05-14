import { Request, Response } from "express";
import SBT from "../models/SBT";

export const getSBTDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const sbt = await SBT.findOne({ userId }).populate(
      "userId",
      "name walletAddress"
    );

    if (!sbt) {
      return res.status(404).json({ error: "No SBT found for this user" });
    }

    res.json({
      sbtData: {
        creatorType: sbt.creatorType,
        usageCount: sbt.usageCount,
        tokenURI: sbt.tokenURI,
        description: sbt.description,
        issuedAt: sbt.issuedAt,
        user: sbt.userId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch SBT details" });
  }
};
