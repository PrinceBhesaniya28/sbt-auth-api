import { Request } from "express";
import { IUser } from "../models/User";
import { ISBT } from "../models/SBT";
import { ICreatorApplication } from "../models/CreatorApplication";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export type UserRole = IUser["role"];
export type CreatorType = ISBT["creatorType"];
export type ApplicationStatus = ICreatorApplication["status"];
