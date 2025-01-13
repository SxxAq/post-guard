"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureTracker = void 0;
class FailureTracker {
    constructor(timeWindowMinutes, threshold) {
        this.failures = new Map();
        this.timeWindowMinutes = timeWindowMinutes;
        this.threshold = threshold;
    }
    addFailure(ip, reason) {
        const now = new Date();
        if (!this.failures.has(ip)) {
            this.failures.set(ip, { timestamps: [now], reasons: [reason] });
            return { shouldAlert: false };
        }
        const ipData = this.failures.get(ip);
        const timeWindow = new Date(now.getTime() - this.timeWindowMinutes * 60 * 1000);
        // Clean up old failures
        const recentFailures = ipData.timestamps.filter((t) => t >= timeWindow);
        const recentReasons = ipData.reasons.slice(-recentFailures.length);
        // Add new failure
        recentFailures.push(now);
        recentReasons.push(reason);
        this.failures.set(ip, {
            timestamps: recentFailures,
            reasons: recentReasons,
        });
        return { shouldAlert: recentFailures.length >= this.threshold };
    }
    getMetrics() {
        const metrics = [];
        const now = new Date();
        const timeWindow = new Date(now.getTime() - this.timeWindowMinutes * 60 * 1000);
        this.failures.forEach((data, ip) => {
            const recentFailures = data.timestamps.filter((t) => t >= timeWindow);
            if (recentFailures.length > 0) {
                metrics.push({
                    ip,
                    failureCount: recentFailures.length,
                    failures: data.reasons.slice(-recentFailures.length),
                });
            }
        });
        return metrics;
    }
}
exports.FailureTracker = FailureTracker;
