import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AlertService } from "../services/alertService";
import { FailureTracker } from "../services/failureTracker";
import { CONFIG } from "../configs/appConfig";

const failureTracker = new FailureTracker(
  CONFIG.TIME_WINDOW_MINUTES,
  CONFIG.FAILURE_THRESHOLD,
);

declare module "express-serve-static-core" {
  interface Request {
    user?: jwt.JwtPayload;
  }
}

export const login = (req: Request, res: Response): Response => {
  const { username, password } = req.body;

  if (
    username === CONFIG.STATIC_USERNAME &&
    password === CONFIG.STATIC_PASSWORD
  ) {
    const token = jwt.sign(
      { userId: "1", username: CONFIG.STATIC_USERNAME },
      CONFIG.JWT_SECRET,
      { expiresIn: CONFIG.JWT_EXPIRATION || "1h" },
    );
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const ip = (req.ip || req.socket.remoteAddress || "unknown") as string;

  if (!token) {
    await AlertService.handleFailure(
      ip,
      "Missing access token",
      failureTracker,
    );
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    await AlertService.handleFailure(
      ip,
      "Invalid access token",
      failureTracker,
    );
    return res.status(401).json({ error: "Invalid access token" });
  }
};
