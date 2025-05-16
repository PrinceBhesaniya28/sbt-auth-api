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
exports.getIPNFTDetails = exports.listIPNFTs = exports.mintIPNFT = void 0;
const IPNFT_1 = __importDefault(require("../models/IPNFT"));
const User_1 = __importDefault(require("../models/User"));
const SBT_1 = __importDefault(require("../models/SBT"));
const ethers_1 = require("ethers");
// Mock IPFS upload function - in production would use actual IPFS API
const uploadToIPFS = (file) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulate IPFS hash generation
    const hash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(Date.now().toString() + Math.random()));
    return {
        imageURI: `https://ipfs.io/ipfs/${hash.substring(2, 30)}`,
        ipfsURI: `ipfs://${hash.substring(2, 30)}`
    };
});
// Mock blockchain transaction - in production would interact with actual blockchain
const submitToBlockchain = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulate transaction hash
    return ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(JSON.stringify(data) + Date.now().toString()));
});
// Mint IP NFT for registered designs/artwork
const mintIPNFT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, description, price, influencerShare } = req.body;
        // Check if user exists and has a valid SBT
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userSBT = yield SBT_1.default.findOne({ userId });
        if (!userSBT) {
            return res.status(403).json({ error: "User does not have a creator SBT" });
        }
        // Handle file upload (mock for this implementation)
        // In a real app, req.file would contain the uploaded image
        const file = req.file || {
            originalname: "sample-design.jpg",
            buffer: Buffer.from("mock file content")
        };
        // Upload to IPFS (mocked)
        const { imageURI, ipfsURI } = yield uploadToIPFS(file);
        // Submit to blockchain (mocked)
        const transactionData = {
            name,
            description,
            creator: userId,
            price,
            imageURI
        };
        const transactionHash = yield submitToBlockchain(transactionData);
        // Create IPNFT record
        const ipnft = new IPNFT_1.default({
            userId,
            name,
            description,
            imageURI,
            ipfsURI,
            price,
            influencerShare,
            transactionHash
        });
        yield ipnft.save();
        res.status(201).json({
            ipnftId: ipnft.id,
            ipfsURI,
            transactionHash
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to mint IP NFT" });
    }
});
exports.mintIPNFT = mintIPNFT;
// List all IP NFTs by a creator
const listIPNFTs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        // Build query based on userId if provided
        const query = userId ? { userId } : {};
        const ipnfts = yield IPNFT_1.default.find(query).select('_id name ipfsURI price');
        res.json(ipnfts.map(ipnft => ({
            ipnftId: ipnft._id,
            name: ipnft.name,
            ipfsURI: ipnft.ipfsURI,
            price: ipnft.price
        })));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch IP NFTs" });
    }
});
exports.listIPNFTs = listIPNFTs;
// Fetch IP NFT metadata
const getIPNFTDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ipnftId } = req.params;
        const ipnft = yield IPNFT_1.default.findById(ipnftId).populate('userId', 'name walletAddress');
        if (!ipnft) {
            return res.status(404).json({ error: "IP NFT not found" });
        }
        // Get creator's SBT
        const creatorSBT = yield SBT_1.default.findOne({ userId: ipnft.userId }).select('creatorType');
        res.json({
            name: ipnft.name,
            imageURI: ipnft.imageURI,
            creatorSBT: creatorSBT ? creatorSBT.creatorType : null,
            usageCount: ipnft.usageCount
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch IP NFT details" });
    }
});
exports.getIPNFTDetails = getIPNFTDetails;
