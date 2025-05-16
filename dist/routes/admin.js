"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const admin_2 = require("../validators/admin");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @route POST /api/admin/sbt/issue
 * @desc Issue SBT after approval (Admin-only)
 * @access Private (Admin)
 */
router.post("/sbt/issue", auth_1.authenticate, auth_1.isAdmin, admin_2.validateIssueSBT, admin_1.issueSBT);
exports.default = router;
