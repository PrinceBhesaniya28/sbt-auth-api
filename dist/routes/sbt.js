"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sbt_1 = require("../controllers/sbt");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @route GET /api/sbt/:userId
 * @desc Fetch SBT details for a user
 * @access Private
 */
router.get("/:userId", auth_1.authenticate, sbt_1.getSBTDetails);
exports.default = router;
