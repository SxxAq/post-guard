import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Failure {
  ip: string;
  reason: string;
  timestamp: Date;
}

export interface Metrics {
  ip: string;
  failureCount: number;
  failures: string[];
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
