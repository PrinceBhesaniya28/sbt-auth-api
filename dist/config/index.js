"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.ADMIN_WALLET_PRIVATE_KEY = exports.PROVIDER_URL = exports.SBT_CONTRACT_ADDRESS = exports.JWT_SECRET = void 0;
const config = {
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
    SBT_CONTRACT_ADDRESS: process.env.SBT_CONTRACT_ADDRESS || "0x...",
    PROVIDER_URL: process.env.PROVIDER_URL || "https://mainnet.infura.io/v3/your-project-id",
    ADMIN_WALLET_PRIVATE_KEY: process.env.ADMIN_WALLET_PRIVATE_KEY || "your-private-key",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/sbt-platform",
};
exports.JWT_SECRET = config.JWT_SECRET, exports.SBT_CONTRACT_ADDRESS = config.SBT_CONTRACT_ADDRESS, exports.PROVIDER_URL = config.PROVIDER_URL, exports.ADMIN_WALLET_PRIVATE_KEY = config.ADMIN_WALLET_PRIVATE_KEY, exports.MONGODB_URI = config.MONGODB_URI;
