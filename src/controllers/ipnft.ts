import { Request, Response } from "express";
import IPNFT from "../models/IPNFT";
import User from "../models/User";
import SBT from "../models/SBT";
import { ethers } from "ethers";

// Mock IPFS upload function - in production would use actual IPFS API
const uploadToIPFS = async (file: any) => {
  // Simulate IPFS hash generation
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(Date.now().toString() + Math.random())
  );
  return {
    imageURI: `https://ipfs.io/ipfs/${hash.substring(2, 30)}`,
    ipfsURI: `ipfs://${hash.substring(2, 30)}`
  };
};

// Mock blockchain transaction - in production would interact with actual blockchain
const submitToBlockchain = async (data: any) => {
  // Simulate transaction hash
  return ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(JSON.stringify(data) + Date.now().toString())
  );
};

// Mint IP NFT for registered designs/artwork
export const mintIPNFT = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, price, influencerShare } = req.body;
    
    // Check if user exists and has a valid SBT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const userSBT = await SBT.findOne({ userId });
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
    const { imageURI, ipfsURI } = await uploadToIPFS(file);
    
    // Submit to blockchain (mocked)
    const transactionData = {
      name,
      description,
      creator: userId,
      price,
      imageURI
    };
    const transactionHash = await submitToBlockchain(transactionData);
    
    // Create IPNFT record
    const ipnft = new IPNFT({
      userId,
      name,
      description,
      imageURI,
      ipfsURI,
      price,
      influencerShare,
      transactionHash
    });
    
    await ipnft.save();
    
    res.status(201).json({
      ipnftId: ipnft.id,
      ipfsURI,
      transactionHash
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to mint IP NFT" });
  }
};

// List all IP NFTs by a creator
export const listIPNFTs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    // Build query based on userId if provided
    const query = userId ? { userId } : {};
    
    const ipnfts = await IPNFT.find(query).select('_id name ipfsURI price');
    
    res.json(ipnfts.map(ipnft => ({
      ipnftId: ipnft._id,
      name: ipnft.name,
      ipfsURI: ipnft.ipfsURI,
      price: ipnft.price
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch IP NFTs" });
  }
};

// Fetch IP NFT metadata
export const getIPNFTDetails = async (req: Request, res: Response) => {
  try {
    const { ipnftId } = req.params;
    
    const ipnft = await IPNFT.findById(ipnftId).populate('userId', 'name walletAddress');
    
    if (!ipnft) {
      return res.status(404).json({ error: "IP NFT not found" });
    }
    
    // Get creator's SBT
    const creatorSBT = await SBT.findOne({ userId: ipnft.userId }).select('creatorType');
    
    res.json({
      name: ipnft.name,
      imageURI: ipnft.imageURI,
      creatorSBT: creatorSBT ? creatorSBT.creatorType : null,
      usageCount: ipnft.usageCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch IP NFT details" });
  }
}; 