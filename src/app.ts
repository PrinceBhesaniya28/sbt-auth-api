import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import sbtRouter from "./routes/sbt";
import creatorRouter from "./routes/creator";
import adminRouter from "./routes/admin";
import ipnftRoutes from "./routes/ipnft";
import { MONGODB_URI } from "./config";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sbt", sbtRouter);
app.use("/api/creator", creatorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/ipnft", ipnftRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
