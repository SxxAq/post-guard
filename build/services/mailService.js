"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAlertEmail = void 0;
const mailConfig_1 = require("../configs/mailConfig");
const sendAlertEmail = async (ip, failures) => {
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: process.env.ALERT_EMAIL || process.env.GOOGLE_EMAIL,
        subject: `Alert: Multiple Failed Requests from IP ${ip}`,
        html: `
      <h2>Multiple Failed Requests Detected</h2>
      <p>IP Address: ${ip}</p>
      <p>Number of failures: ${failures.length}</p>
      <h3>Failure Reasons:</h3>
      <ul>
        ${failures.map((failure) => `<li>${failure}</li>`).join("")}
      </ul>
    `,
    };
    try {
        await mailConfig_1.mailTransporter.sendMail(mailOptions);
        console.log(`Alert email sent for IP: ${ip}`);
    }
    catch (error) {
        console.error("Error sending alert email:", error);
    }
};
exports.sendAlertEmail = sendAlertEmail;
