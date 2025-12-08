import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

// Load environment variables
config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("Testing database connection...");
    await prisma.$connect();
    console.log("✅ Successfully connected to database!");
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Current user count: ${userCount}`);
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    
    if (error.message.includes("P1001")) {
      console.error("\n💡 Possible issues:");
      console.error("   - Check your DATABASE_URL in .env file");
      console.error("   - Verify the endpoint is correct");
      console.error("   - Ensure your IP is allowed in security group");
      console.error("   - Check username/password are correct");
    }
    
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();

