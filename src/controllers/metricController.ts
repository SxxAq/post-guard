import { Request, Response } from "express";
import { FailureModal } from "../models/failureModel";

export const metricsController = {
  getMetrics: async (req: Request, res: Response) => {
    try {
      const metrics = await FailureModal.aggregate([
        {
          $group: {
            _id: "$ip",
            failureCount: { $sum: 1 },
            failures: { $push: "$reason" },
          },
        },
      ]);

      res.status(200).json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Error fetching metrics" });
    }
  },
};
