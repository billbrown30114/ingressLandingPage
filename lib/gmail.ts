import nodemailer from "nodemailer";

/**
 * Send email via SMTP (simplest approach - works with Gmail)
 * @param fromEmail - Email address to send from
 * @param emailData - Email details
 */
export async function sendEmail(
  fromEmail: string,
  emailData: {
    to: string;
    subject: string;
    htmlBody: string;
  }
) {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    throw new Error(
      "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASSWORD in your .env file.\n" +
      "For Gmail: Use your Gmail address and password (or App Password if 2FA is enabled)."
    );
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: `"Ingress Software" <${fromEmail}>`,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.htmlBody,
  });

  return { messageId: info.messageId };
}


export function generateConfirmationEmail(
  meetingData: {
    visitorName: string;
    meetingDate: string;
    meetingTime: string;
    meetingLink?: string;
    duration: number;
  }
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Meeting Confirmed</h1>
        </div>
        <div class="content">
          <p>Hi ${meetingData.visitorName},</p>
          <p>Your meeting has been confirmed for:</p>
          <p><strong>Date:</strong> ${meetingData.meetingDate}</p>
          <p><strong>Time:</strong> ${meetingData.meetingTime}</p>
          <p><strong>Duration:</strong> ${meetingData.duration} minutes</p>
          ${meetingData.meetingLink ? `<p><a href="${meetingData.meetingLink}" class="button">Join Meeting</a></p>` : ""}
          <p>We look forward to speaking with you!</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateStaffNotificationEmail(
  meetingData: {
    visitorName: string;
    visitorEmail: string;
    visitorPhone?: string;
    meetingDate: string;
    meetingTime: string;
    meetingLink?: string;
    duration: number;
    meetingType: string;
    notes?: string;
  }
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .info-box { background-color: #ffffff; border-left: 4px solid #059669; padding: 15px; margin: 15px 0; }
        .button { display: inline-block; padding: 12px 24px; background-color: #059669; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Meeting Scheduled</h1>
        </div>
        <div class="content">
          <p>A new meeting has been scheduled:</p>
          <div class="info-box">
            <p><strong>Meeting Type:</strong> ${meetingData.meetingType}</p>
            <p><strong>Date:</strong> ${meetingData.meetingDate}</p>
            <p><strong>Time:</strong> ${meetingData.meetingTime}</p>
            <p><strong>Duration:</strong> ${meetingData.duration} minutes</p>
            <p><strong>Visitor:</strong> ${meetingData.visitorName}</p>
            <p><strong>Email:</strong> ${meetingData.visitorEmail}</p>
            ${meetingData.visitorPhone ? `<p><strong>Phone:</strong> ${meetingData.visitorPhone}</p>` : ""}
            ${meetingData.notes ? `<p><strong>Notes:</strong> ${meetingData.notes}</p>` : ""}
          </div>
          ${meetingData.meetingLink ? `<p><a href="${meetingData.meetingLink}" class="button">Join Meeting</a></p>` : ""}
        </div>
      </div>
    </body>
    </html>
  `;
}
