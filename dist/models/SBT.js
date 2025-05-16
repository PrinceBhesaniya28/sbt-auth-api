"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SBTSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creatorType: {
        type: String,
        enum: ["Designer", "Artist", "Influencer"],
        required: true,
    },
    tokenURI: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    transactionHash: {
        type: String,
        required: true,
        unique: true,
    },
    issuedAt: {
        type: Date,
        default: Date.now,
    },
    usageCount: {
        type: Number,
        default: 0,
    },
});
const SBT = mongoose_1.default.model("SBT", SBTSchema);
exports.default = SBT;
