import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

/**
 * Get OAuth2 client for Gmail API using refresh token
 * This works with personal Gmail accounts
 */
export function getGmailOAuthClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Gmail OAuth credentials not configured. Please set GOOGLE_OAUTH_CLIENT_ID, " +
      "GOOGLE_OAUTH_CLIENT_SECRET, and GOOGLE_OAUTH_REFRESH_TOKEN in your .env file."
    );
  }

  const oauth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback"
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oauth2Client;
}

/**
 * Send email via Gmail API using OAuth 2.0 refresh token
 */
export async function sendEmailOAuth(
  fromEmail: string,
  emailData: {
    to: string;
    subject: string;
    htmlBody: string;
  }
) {
  const auth = getGmailOAuthClient();
  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    `To: ${emailData.to}`,
    `From: ${fromEmail}`,
    `Subject: ${emailData.subject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    emailData.htmlBody,
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  return response.data;
}

