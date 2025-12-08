import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Load environment variables - try multiple sources
if (!process.env.DATABASE_URL) {
  // Try loading from .env.production (created during Amplify build)
  const possiblePaths = [
    resolve(process.cwd(), '.env.production'),
    resolve(process.cwd(), '.next', '.env.production'),
    resolve(process.cwd(), '.next', 'standalone', '.env.production'),
    resolve(process.cwd(), '.next', 'standalone', '.env.local'),
    resolve(process.cwd(), '.env.local'),
  ];
  
  for (const envPath of possiblePaths) {
    config({ path: envPath });
    if (process.env.DATABASE_URL) {
      console.log(`Loaded DATABASE_URL from ${envPath}`);
      break;
    }
  }
  
  // If still not found and we're in AWS Lambda, try AWS SSM Parameter Store
  if (!process.env.DATABASE_URL && process.env.AWS_LAMBDA_FUNCTION_NAME) {
    try {
      // This will be handled by Lambda environment variables if configured
      console.log("Running in Lambda, checking for DATABASE_URL in environment");
    } catch (e) {
      console.error("Failed to load DATABASE_URL from SSM:", e);
    }
  }
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found. Tried paths:", possiblePaths);
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// In production, reuse the same instance across requests
if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma = prisma;
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
}

