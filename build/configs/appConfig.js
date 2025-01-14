"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    FAILURE_THRESHOLD: parseInt(process.env.FAILURE_THRESHOLD || "5"),
    TIME_WINDOW_MINUTES: parseInt(process.env.TIME_WINDOW_MINUTES || "10"),
    JWT_SECRET: process.env.JWT_SECRET || "post-guard-secret",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "24h",
    STATIC_USERNAME: "admin",
    STATIC_PASSWORD: "admin123",
};
