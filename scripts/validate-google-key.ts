import { JWT } from "google-auth-library";
require("dotenv").config();

/**
 * Script to validate Google Service Account private key format
 * Run with: npm run validate-google-key
 */

function validateGoogleKey() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  console.log("🔍 Validating Google Service Account credentials...\n");

  if (!serviceAccountEmail) {
    console.error("❌ GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in .env");
    process.exit(1);
  }

  if (!serviceAccountKey) {
    console.error("❌ GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not set in .env");
    process.exit(1);
  }

  console.log(`✅ Service Account Email: ${serviceAccountEmail}\n`);

  // Check key format
  let privateKey = serviceAccountKey.trim();
  
  // Check for BEGIN/END markers
  const hasBegin = privateKey.includes("BEGIN");
  const hasEnd = privateKey.includes("END");
  
  if (!hasBegin || !hasEnd) {
    console.error("❌ Private key is missing BEGIN or END markers");
    console.error("   The key should look like:");
    console.error("   -----BEGIN PRIVATE KEY-----");
    console.error("   ...");
    console.error("   -----END PRIVATE KEY-----");
    process.exit(1);
  }

  // Process the key
  privateKey = privateKey.replace(/\\n/g, "\n");

  // Try to create a JWT client to validate
  try {
    const jwt = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    console.log("✅ Private key format is valid!");
    console.log("\n📝 Key details:");
    console.log(`   - Length: ${privateKey.length} characters`);
    console.log(`   - Contains newlines: ${privateKey.includes("\n") ? "Yes" : "No"}`);
    console.log(`   - Key type: ${privateKey.includes("BEGIN PRIVATE KEY") ? "PKCS#8" : "RSA"}`);
    
    console.log("\n✅ Google Service Account credentials are properly configured!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Failed to validate private key:");
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes("DECODER") || error.message.includes("unsupported")) {
      console.error("\n💡 Common fixes:");
      console.error("   1. Ensure the private key is on a single line with \\n characters");
      console.error("   2. Or use actual newlines (but escape them properly in .env)");
      console.error("   3. Copy the entire key from the JSON file, including BEGIN/END markers");
      console.error("   4. Make sure there are no extra spaces or characters");
    }
    
    process.exit(1);
  }
}

validateGoogleKey();

