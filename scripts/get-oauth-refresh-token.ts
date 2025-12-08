import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
import { resolve } from "path";
import * as readline from "readline";

// Load environment variables
config({ path: resolve(process.cwd(), ".env") });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function getRefreshToken() {
  console.log("\n🔐 Gmail OAuth 2.0 Refresh Token Generator\n");
  console.log("This script will help you generate a refresh token for Gmail API.\n");

  // Check if credentials are in .env
  let clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  let clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  let redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

  if (!clientId || !clientSecret) {
    console.log("⚠️  OAuth credentials not found in .env file.\n");
    clientId = await question("Enter your Google OAuth Client ID: ");
    clientSecret = await question("Enter your Google OAuth Client Secret: ");
    const customRedirect = await question(`Enter redirect URI [${redirectUri}]: `);
    if (customRedirect.trim()) {
      redirectUri = customRedirect.trim();
    }
  } else {
    console.log("✅ Found OAuth credentials in .env file");
    console.log(`   Client ID: ${clientId.substring(0, 20)}...`);
    console.log(`   Redirect URI: ${redirectUri}\n`);
  }

  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

  // Generate authorization URL
  const scopes = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Required to get refresh token
    scope: scopes,
    prompt: "consent", // Force consent screen to ensure refresh token
  });

  console.log("\n📋 Follow these steps:\n");
  console.log("1. Open this URL in your browser:");
  console.log(`   ${authUrl}\n`);
  console.log("2. Sign in with your Gmail account");
  console.log("3. Grant the requested permissions");
  console.log("4. Copy the authorization code from the redirect URL\n");

  const code = await question("Paste the authorization code here: ");

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      console.error("\n❌ Error: No refresh token received!");
      console.error("This usually happens if you've already authorized the app.");
      console.error("Try revoking access at: https://myaccount.google.com/permissions");
      console.error("Then run this script again.\n");
      process.exit(1);
    }

    console.log("\n✅ Success! Refresh token generated:\n");
    console.log("─".repeat(80));
    console.log(tokens.refresh_token);
    console.log("─".repeat(80));
    console.log("\n📝 Add this to your .env file:\n");
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN="${tokens.refresh_token}"`);
    console.log("\n💡 Don't forget to also add:");
    console.log(`GOOGLE_OAUTH_CLIENT_ID="${clientId}"`);
    console.log(`GOOGLE_OAUTH_CLIENT_SECRET="${clientSecret}"`);
    console.log(`GOOGLE_OAUTH_REDIRECT_URI="${redirectUri}"`);
    console.log("\n✨ After adding these to .env, restart your server.\n");
  } catch (error: any) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

getRefreshToken();

