"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const sbt_1 = __importDefault(require("./routes/sbt"));
const creator_1 = __importDefault(require("./routes/creator"));
const admin_1 = __importDefault(require("./routes/admin"));
const ipnft_1 = __importDefault(require("./routes/ipnft"));
const config_1 = require("./config");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/sbt", sbt_1.default);
app.use("/api/creator", creator_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/ipnft", ipnft_1.default);
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
