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
