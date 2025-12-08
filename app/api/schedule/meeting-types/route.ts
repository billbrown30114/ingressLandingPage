import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const meetingTypes = await prisma.meetingType.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(meetingTypes);
  } catch (error: any) {
    console.error("Error fetching meeting types:", error);
    const errorMessage = error?.message || "Unknown error";
    const errorCode = error?.code || "UNKNOWN";
    const errorStack = error?.stack || "";
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: "Failed to fetch meeting types",
        message: errorMessage,
        code: errorCode,
        stack: errorStack.split('\n').slice(0, 3).join('\n'), // First 3 lines of stack
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
      { status: 500 }
    );
  }
}
