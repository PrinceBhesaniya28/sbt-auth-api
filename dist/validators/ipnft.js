"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetIPNFT = exports.validateMintIPNFT = void 0;
const express_validator_1 = require("express-validator");
exports.validateMintIPNFT = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID is required"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("price")
        .isNumeric()
        .withMessage("Price must be a number")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),
    (0, express_validator_1.body)("influencerShare")
        .isNumeric()
        .withMessage("Influencer share must be a number")
        .isFloat({ min: 0, max: 100 })
        .withMessage("Influencer share must be between 0 and 100"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateGetIPNFT = [
    (0, express_validator_1.param)("ipnftId").notEmpty().withMessage("IP NFT ID is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
