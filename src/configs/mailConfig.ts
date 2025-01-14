import nodemailer from "nodemailer";

import SMTPTransport from "nodemailer/lib/smtp-transport";

async function createTransporter() {
  try {
    const transportOptions: SMTPTransport.Options = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
      },
    };

    const transporter = nodemailer.createTransport(transportOptions);

    // Verify the connection
    await transporter.verify();
    console.log("Email transporter configured successfully");
    return transporter;
  } catch (error) {
    console.error("Error creating mail transporter:", error);
    throw error;
  }
}

let transporter: nodemailer.Transporter | null = null;

export async function getMailTransporter(): Promise<nodemailer.Transporter> {
  if (!transporter) {
    transporter = await createTransporter();
  }
  return transporter;
}
