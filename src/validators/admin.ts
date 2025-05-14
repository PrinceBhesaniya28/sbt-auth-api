import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateIssueSBT = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("creatorType")
    .isIn(["Designer", "Artist", "Influencer"])
    .withMessage("Invalid creator type"),
  body("tokenURI").notEmpty().withMessage("Token URI is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
