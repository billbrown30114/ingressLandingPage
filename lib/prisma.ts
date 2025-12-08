import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Load environment variables - Amplify should provide these, but fallback to .env files
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
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found. Tried paths:", possiblePaths);
    console.error("Current working directory:", process.cwd());
    console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('DB')));
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

