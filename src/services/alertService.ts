import { sendAlertEmail } from "./mailService";
import { FailureModal } from "../models/failureModel";
import { FailureTracker } from "./failureTracker";

export class AlertService {
  static async handleFailure(
    ip: string,
    reason: string,
    tracker: FailureTracker,
  ): Promise<void> {
    try {
      const { shouldAlert } = tracker.addFailure(ip, reason);

      // Log to MongoDB
      await FailureModal.create({
        ip,
        reason,
        timestamp: new Date(),
      });

      if (shouldAlert) {
        const metrics = tracker.getMetrics();
        const ipFailures = metrics.find((m) => m.ip === ip)?.failures || [];
        await sendAlertEmail(ip, ipFailures);
      }
    } catch (error) {
      console.error("Error handling failure:", error);
      // You might want to add additional error handling here
      throw error;
    }
  }
}
