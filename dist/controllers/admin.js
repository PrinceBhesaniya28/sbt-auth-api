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
exports.issueSBT = void 0;
const SBT_1 = __importDefault(require("../models/SBT"));
const User_1 = __importDefault(require("../models/User"));
const ethers_1 = require("ethers");
const config_1 = require("../config");
const issueSBT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, creatorType, tokenURI } = req.body;
        // Check if user exists
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check if user already has an SBT
        const existingSBT = yield SBT_1.default.findOne({ userId });
        if (existingSBT) {
            return res.status(400).json({ error: "User already has an SBT" });
        }
        // Here you would interact with your smart contract
        // This is a simplified example
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.PROVIDER_URL);
        const wallet = new ethers_1.ethers.Wallet(config_1.ADMIN_WALLET_PRIVATE_KEY, provider);
        // In a real implementation, you would have your SBT contract ABI here
        // const sbtContract = new ethers.Contract(SBT_CONTRACT_ADDRESS, SBT_ABI, wallet);
        // const tx = await sbtContract.mint(user.walletAddress, tokenURI);
        // For demo purposes, we'll simulate a transaction hash
        const transactionHash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.randomBytes(32));
        // Create SBT record in database
        const sbt = new SBT_1.default({
            userId,
            creatorType,
            tokenURI,
            transactionHash,
            issuedAt: new Date(),
        });
        yield sbt.save();
        // Update user role if needed
        if (user.role === "user") {
            user.role = creatorType.toLowerCase(); // e.g., 'designer', 'artist', etc.
            yield user.save();
        }
        res.status(201).json({
            sbtId: sbt.id,
            transactionHash,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to issue SBT" });
    }
});
exports.issueSBT = issueSBT;
