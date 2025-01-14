"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAlertEmail = void 0;
const mailConfig_1 = require("../configs/mailConfig");
const sendAlertEmail = async (ip, failures) => {
    try {
        const transporter = await (0, mailConfig_1.getMailTransporter)();
        const mailOptions = {
            from: `Security Alert <${process.env.EMAIL}>`,
            to: process.env.ALERT_EMAIL,
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
        await transporter.sendMail(mailOptions);
        console.log(`Alert email sent successfully for IP: ${ip}`);
    }
    catch (error) {
        console.error("Error sending alert email:", error);
        console.error("Mail configuration:", {
            user: process.env.EMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Missing",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Missing",
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN ? "Set" : "Missing",
        });
        throw error;
    }
};
exports.sendAlertEmail = sendAlertEmail;
