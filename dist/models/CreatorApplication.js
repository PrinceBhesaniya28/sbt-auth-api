"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CreatorApplicationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creatorType: {
        type: String,
        required: true,
    },
    portfolio: {
        type: [String],
        required: true,
    },
    SNSLinks: {
        twitter: String,
        instagram: String,
        website: String,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    reviewedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    reviewedAt: {
        type: Date,
    },
    feedback: {
        type: String,
    },
}, { timestamps: true });
const CreatorApplication = mongoose_1.default.model("CreatorApplication", CreatorApplicationSchema);
exports.default = CreatorApplication;
