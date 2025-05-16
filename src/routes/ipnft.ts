import { Router } from "express";
import { mintIPNFT, listIPNFTs, getIPNFTDetails } from "../controllers/ipnft";
import { validateMintIPNFT, validateGetIPNFT } from "../validators/ipnft";
import { authenticate } from "../middleware/auth";
import multer from "multer";

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/**
 * @route POST /api/ipnft/mint
 * @desc Mint IP NFT for registered designs/artwork
 * @access Private
 */
router.post(
  "/mint",
  authenticate,
  upload.single("imageFile"),
  validateMintIPNFT,
  mintIPNFT
);

/**
 * @route GET /api/ipnft/list
 * @desc List all IP NFTs by a creator
 * @access Public
 */
router.get("/list", listIPNFTs);

/**
 * @route GET /api/ipnft/:ipnftId
 * @desc Fetch IP NFT metadata
 * @access Public
 */
router.get("/:ipnftId", validateGetIPNFT, getIPNFTDetails);

export default router; 