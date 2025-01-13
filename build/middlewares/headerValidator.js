"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeaders = void 0;
const alertService_1 = require("../services/alertService");
const failureTracker_1 = require("../services/failureTracker");
const appConfig_1 = require("../configs/appConfig");
const failureTracker = new failureTracker_1.FailureTracker(appConfig_1.CONFIG.TIME_WINDOW_MINUTES, appConfig_1.CONFIG.FAILURE_THRESHOLD);
const validateHeaders = (req, res, next) => {
    const requiredHeaders = ["content-type", "authorization"];
    const missingHeaders = requiredHeaders.filter((header) => !Object.keys(req.headers).includes(header.toLowerCase()));
    const ip = (req.ip || req.socket.remoteAddress || "unknown");
    if (missingHeaders.length > 0) {
        const reason = `Missing required headers: ${missingHeaders.join(", ")}`;
        alertService_1.AlertService.handleFailure(ip, reason, failureTracker).catch(console.error);
        return res.status(400).json({ error: reason });
    }
    next();
};
exports.validateHeaders = validateHeaders;
