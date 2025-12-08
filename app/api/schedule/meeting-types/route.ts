import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection first
    await prisma.$connect();
    
    const meetingTypes = await prisma.meetingType.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(meetingTypes);
  } catch (error: any) {
    console.error("Error fetching meeting types:", error);
    const errorMessage = error?.message || "Unknown error";
    const errorCode = error?.code || "UNKNOWN";
    
    return NextResponse.json(
      { 
        error: "Failed to fetch meeting types",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        code: errorCode
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}
