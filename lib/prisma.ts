import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Load environment variables from .env.production if DATABASE_URL is not set
// Try multiple paths where the file might be located in Lambda
if (!process.env.DATABASE_URL) {
  const possiblePaths = [
    resolve(process.cwd(), '.env.production'),
    resolve(process.cwd(), '.next', '.env.production'),
    resolve(process.cwd(), '.next', 'standalone', '.env.production'),
    resolve(process.cwd(), '.next', 'standalone', '.env.local'),
    resolve(process.cwd(), '.env.local'),
  ];
  
  for (const envPath of possiblePaths) {
    config({ path: envPath });
    if (envPath);
    if (process.env.DATABASE_URL) {
      console.log(`Loaded DATABASE_URL from ${envPath}`);
      break;
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

