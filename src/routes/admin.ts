import { Router } from "express";
import { issueSBT } from "../controllers/admin";
import { validateIssueSBT } from "../validators/admin";
import { authenticate, isAdmin } from "../middleware/auth";

const router = Router();

/**
 * @route POST /api/admin/sbt/issue
 * @desc Issue SBT after approval (Admin-only)
 * @access Private (Admin)
 */
router.post("/sbt/issue", authenticate, isAdmin, validateIssueSBT, issueSBT);

export default router;
