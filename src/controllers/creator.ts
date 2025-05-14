import { Request, Response } from "express";
import CreatorApplication from "../models/CreatorApplication";

export const applyForCreator = async (req: Request, res: Response) => {
  try {
    const { userId, creatorType, portfolio, SNSLinks } = req.body;

    const application = new CreatorApplication({
      userId,
      creatorType,
      portfolio,
      SNSLinks,
      status: "pending",
    });

    await application.save();

    res.status(201).json({
      applicationId: application.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
};
