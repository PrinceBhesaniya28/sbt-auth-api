"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSBTDetails = void 0;
const SBT_1 = __importDefault(require("../models/SBT"));
const getSBTDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const sbt = yield SBT_1.default.findOne({ userId }).populate("userId", "name walletAddress");
        if (!sbt) {
            return res.status(404).json({ error: "No SBT found for this user" });
        }
        res.json({
            sbtData: {
                creatorType: sbt.creatorType,
                usageCount: sbt.usageCount,
                tokenURI: sbt.tokenURI,
                description: sbt.description,
                issuedAt: sbt.issuedAt,
                user: sbt.userId,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch SBT details" });
    }
});
exports.getSBTDetails = getSBTDetails;
