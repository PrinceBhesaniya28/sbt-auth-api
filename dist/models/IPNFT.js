"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const IPNFTSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURI: {
        type: String,
        required: true,
    },
    ipfsURI: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    influencerShare: {
        type: Number,
        required: true,
    },
    transactionHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    usageCount: {
        type: Number,
        default: 0,
    }
});
const IPNFT = mongoose_1.default.model("IPNFT", IPNFTSchema);
exports.default = IPNFT;
