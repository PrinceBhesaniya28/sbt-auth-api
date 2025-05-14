const config = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  SBT_CONTRACT_ADDRESS: process.env.SBT_CONTRACT_ADDRESS || "0x...",
  PROVIDER_URL:
    process.env.PROVIDER_URL || "https://mainnet.infura.io/v3/your-project-id",
  ADMIN_WALLET_PRIVATE_KEY:
    process.env.ADMIN_WALLET_PRIVATE_KEY || "your-private-key",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/sbt-platform",
};

export const {
  JWT_SECRET,
  SBT_CONTRACT_ADDRESS,
  PROVIDER_URL,
  ADMIN_WALLET_PRIVATE_KEY,
  MONGODB_URI,
} = config;
