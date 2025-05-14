import mongoose from "mongoose";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface ICreatorApplication extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  creatorType: string;
  portfolio: string[];
  SNSLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  status: ApplicationStatus;
  reviewedBy?: mongoose.Schema.Types.ObjectId;
  reviewedAt?: Date;
  feedback?: string;
}

const CreatorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const CreatorApplication = mongoose.model<ICreatorApplication>(
  "CreatorApplication",
  CreatorApplicationSchema
);
export default CreatorApplication;
