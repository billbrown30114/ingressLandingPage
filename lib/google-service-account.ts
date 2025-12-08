import { google } from "googleapis";
import { JWT } from "google-auth-library";

let serviceAccountClient: JWT | null = null;

/**
 * Get or create Google Service Account client
 * Uses service account credentials to authenticate with Google APIs
 */
export function getServiceAccountClient() {
  if (serviceAccountClient) {
    return serviceAccountClient;
  }

  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error(
      "Google Service Account credentials not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in your .env file."
    );
  }

  // Process the private key - handle various formats
  let privateKey = serviceAccountKey.trim();
  
  // Replace escaped newlines (common in .env files)
  // Handle both \\n (double escaped) and \n (single escaped)
  privateKey = privateKey.replace(/\\n/g, "\n");
  
  // Ensure the key has proper BEGIN/END markers
  if (!privateKey.includes("BEGIN PRIVATE KEY") && !privateKey.includes("BEGIN RSA PRIVATE KEY")) {
    throw new Error(
      "Invalid private key format. The key must include BEGIN/END markers. " +
      "Make sure to copy the entire private key from the JSON file, including the BEGIN and END lines. " +
      "Run 'npm run validate-google-key' to check your key format."
    );
  }

  // Create JWT client with better error handling
  try {
    serviceAccountClient = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/gmail.send",
      ],
    });
  } catch (error: any) {
    if (error.message?.includes("DECODER") || error.message?.includes("unsupported") || error.code === "ERR_OSSL_UNSUPPORTED") {
      throw new Error(
        "Failed to parse Google Service Account private key. " +
        "The key format is incorrect. Common issues:\n" +
        "1. The key must be on a single line in .env with \\n for newlines\n" +
        "2. Or use actual newlines (but ensure proper escaping)\n" +
        "3. Copy the entire 'private_key' value from the JSON file\n" +
        "4. Run 'npm run validate-google-key' to diagnose the issue\n" +
        `Original error: ${error.message}`
      );
    }
    throw error;
  }

  return serviceAccountClient;
}

/**
 * Get authenticated client for a specific user's calendar
 * Uses domain-wide delegation to impersonate the user
 */
export function getAuthenticatedClient(userEmail: string) {
  const client = getServiceAccountClient();
  
  // Set the subject (user to impersonate) for domain-wide delegation
  if (userEmail) {
    client.subject = userEmail;
  }

  return client;
}

