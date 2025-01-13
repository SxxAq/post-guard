"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsController = void 0;
const failureModel_1 = require("../models/failureModel");
exports.metricsController = {
    getMetrics: async (req, res) => {
        try {
            const metrics = await failureModel_1.FailureModal.aggregate([
                {
                    $group: {
                        _id: "$ip",
                        failureCount: { $sum: 1 },
                        failures: { $push: "$reason" },
                    },
                },
            ]);
            res.status(200).json(metrics);
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching metrics" });
        }
    },
};
