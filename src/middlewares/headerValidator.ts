import { Request, Response, NextFunction } from "express";
import { AlertService } from "../services/alertService";
import { FailureTracker } from "../services/failureTracker";
import { CONFIG } from "../configs/appConfig";

const failureTracker = new FailureTracker(
  CONFIG.TIME_WINDOW_MINUTES,
  CONFIG.FAILURE_THRESHOLD,
);

export const validateHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requiredHeaders = ["content-type", "authorization"];
  const missingHeaders = requiredHeaders.filter(
    (header) => !Object.keys(req.headers).includes(header.toLowerCase()),
  );
  const ip = (req.ip || req.socket.remoteAddress || "unknown") as string;

  if (missingHeaders.length > 0) {
    const reason = `Missing required headers: ${missingHeaders.join(", ")}`;
    AlertService.handleFailure(ip, reason, failureTracker).catch(console.error);
    return res.status(400).json({ error: reason });
  }

  next();
};
