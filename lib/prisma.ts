import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Load environment variables from .env.production if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  // Try loading from .env.production (created during Amplify build)
  config({ path: resolve(process.cwd(), '.env.production') });
  // Also try .env.local as fallback
  if (!process.env.DATABASE_URL) {
    config({ path: resolve(process.cwd(), '.env.local') });
  }
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found in environment variables or .env files");
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

