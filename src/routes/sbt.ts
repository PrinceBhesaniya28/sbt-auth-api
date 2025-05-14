import { Router } from "express";
import { getSBTDetails } from "../controllers/sbt";
import { authenticate } from "../middleware/auth";

const router = Router();

/**
 * @route GET /api/sbt/:userId
 * @desc Fetch SBT details for a user
 * @access Private
 */
router.get("/:userId", authenticate, getSBTDetails);

export default router;
