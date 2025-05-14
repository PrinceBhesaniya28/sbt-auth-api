import mongoose from "mongoose";

export type CreatorType = "Designer" | "Artist" | "Influencer";

export interface ISBT extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  creatorType: CreatorType;
  tokenURI: string;
  description?: string;
  transactionHash: string;
  issuedAt: Date;
  usageCount: number;
}

const SBTSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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

const SBT = mongoose.model<ISBT>("SBT", SBTSchema);
export default SBT;
