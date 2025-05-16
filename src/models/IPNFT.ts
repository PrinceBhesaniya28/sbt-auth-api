import mongoose from "mongoose";

export interface IIPNFT extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  imageURI: string;
  ipfsURI: string;
  price: number;
  influencerShare: number;
  transactionHash: string;
  createdAt: Date;
  usageCount: number;
}

const IPNFTSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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

const IPNFT = mongoose.model<IIPNFT>("IPNFT", IPNFTSchema);
export default IPNFT; 