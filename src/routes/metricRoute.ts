//@ts-nocheck
import express, { Express, Request, Response, NextFunction } from "express";
import { metricsController } from "../controllers/metricController";
import { validateToken } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/metrics",
  (req, res, next) => validateToken(req, res, next),
  metricsController.getMetrics,
);

export default router;
