import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const validateMintIPNFT = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("influencerShare")
    .isNumeric()
    .withMessage("Influencer share must be a number")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Influencer share must be between 0 and 100"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetIPNFT = [
  param("ipnftId").notEmpty().withMessage("IP NFT ID is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]; 