"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ipnft_1 = require("../controllers/ipnft");
const ipnft_2 = require("../validators/ipnft");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
// Configure multer for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
/**
 * @route POST /api/ipnft/mint
 * @desc Mint IP NFT for registered designs/artwork
 * @access Private
 */
router.post("/mint", auth_1.authenticate, upload.single("imageFile"), ipnft_2.validateMintIPNFT, ipnft_1.mintIPNFT);
/**
 * @route GET /api/ipnft/list
 * @desc List all IP NFTs by a creator
 * @access Public
 */
router.get("/list", ipnft_1.listIPNFTs);
/**
 * @route GET /api/ipnft/:ipnftId
 * @desc Fetch IP NFT metadata
 * @access Public
 */
router.get("/:ipnftId", ipnft_2.validateGetIPNFT, ipnft_1.getIPNFTDetails);
exports.default = router;
