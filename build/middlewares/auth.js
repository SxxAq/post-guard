"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const alertService_1 = require("../services/alertService");
const failureTracker_1 = require("../services/failureTracker");
const appConfig_1 = require("../configs/appConfig");
const failureTracker = new failureTracker_1.FailureTracker(appConfig_1.CONFIG.TIME_WINDOW_MINUTES, appConfig_1.CONFIG.FAILURE_THRESHOLD);
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === appConfig_1.CONFIG.STATIC_USERNAME &&
        password === appConfig_1.CONFIG.STATIC_PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ userId: "1", username: appConfig_1.CONFIG.STATIC_USERNAME }, appConfig_1.CONFIG.JWT_SECRET, { expiresIn: appConfig_1.CONFIG.JWT_EXPIRATION || "1h" });
        return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid credentials" });
};
exports.login = login;
const validateToken = async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const ip = (req.ip || req.socket.remoteAddress || "unknown");
    if (!token) {
        await alertService_1.AlertService.handleFailure(ip, "Missing access token", failureTracker);
        return res.status(401).json({ error: "Access token required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.CONFIG.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        await alertService_1.AlertService.handleFailure(ip, "Invalid access token", failureTracker);
        return res.status(401).json({ error: "Invalid access token" });
    }
};
exports.validateToken = validateToken;
