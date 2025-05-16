"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creator_1 = require("../controllers/creator");
const creator_2 = require("../validators/creator");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @route POST /api/creator/apply
 * @desc Submit creator certification request
 * @access Private
 */
router.post("/apply", auth_1.authenticate, creator_2.validateCreatorApplication, creator_1.applyForCreator);
exports.default = router;
