"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
const mailService_1 = require("./mailService");
const failureModel_1 = require("../models/failureModel");
class AlertService {
    static async handleFailure(ip, reason, tracker) {
        var _a;
        try {
            const { shouldAlert } = tracker.addFailure(ip, reason);
            // Log to MongoDB
            await failureModel_1.FailureModal.create({
                ip,
                reason,
                timestamp: new Date(),
            });
            if (shouldAlert) {
                const metrics = tracker.getMetrics();
                const ipFailures = ((_a = metrics.find((m) => m.ip === ip)) === null || _a === void 0 ? void 0 : _a.failures) || [];
                await (0, mailService_1.sendAlertEmail)(ip, ipFailures);
            }
        }
        catch (error) {
            console.error("Error handling failure:", error);
            // You might want to add additional error handling here
            throw error;
        }
    }
}
exports.AlertService = AlertService;
