import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Amplify WEB_COMPUTE should provide environment variables via process.env
// Log if DATABASE_URL is missing for debugging
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found in process.env");
  console.error("Available env vars:", Object.keys(process.env).filter(k => 
    k.includes('DATABASE') || k.includes('DB') || k.includes('AMPLIFY')
  ));
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

