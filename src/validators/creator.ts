import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateCreatorApplication = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("creatorType")
    .isIn(["Designer", "Artist", "Influencer"])
    .withMessage("Invalid creator type"),
  body("portfolio")
    .isArray({ min: 1 })
    .withMessage("At least one portfolio item is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
