"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatorApplication = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.validateCreatorApplication = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID is required"),
    (0, express_validator_1.body)("creatorType")
        .isIn(["Designer", "Artist", "Influencer"])
        .withMessage("Invalid creator type"),
    (0, express_validator_1.body)("portfolio")
        .isArray({ min: 1 })
        .withMessage("At least one portfolio item is required"),
    (req, res, next) => {
        const errors = (0, express_validator_2.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
