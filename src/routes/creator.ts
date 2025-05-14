import { Router } from "express";
import { applyForCreator } from "../controllers/creator";
import { validateCreatorApplication } from "../validators/creator";
import { authenticate } from "../middleware/auth";

const router = Router();

/**
 * @route POST /api/creator/apply
 * @desc Submit creator certification request
 * @access Private
 */
router.post(
  "/apply",
  authenticate,
  validateCreatorApplication,
  applyForCreator
);

export default router;
