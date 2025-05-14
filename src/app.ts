import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import sbtRouter from "./routes/sbt";
import creatorRouter from "./routes/creator";
import adminRouter from "./routes/admin";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sbt", sbtRouter);
app.use("/api/creator", creatorRouter);
app.use("/api/admin", adminRouter);

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
