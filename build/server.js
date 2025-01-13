"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const DBconfig_1 = require("./configs/DBconfig");
const metricRoute_1 = __importDefault(require("./routes/metricRoute"));
const submitRoute_1 = __importDefault(require("./routes/submitRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", authRoute_1.default);
app.use("/api", submitRoute_1.default);
app.use("/api", metricRoute_1.default);
process.on("exit", (code) => {
    console.log(`Exiting with code: ${code}`);
});
const startServer = async () => {
    await (0, DBconfig_1.connectDB)();
    const server = app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
    server.on("error", (error) => {
        console.log("Failed to start server!", error);
        process.exit(1);
    });
};
startServer();
