import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Log environment info for debugging
    console.log("API Route - DATABASE_URL present:", !!process.env.DATABASE_URL);
    console.log("API Route - NODE_ENV:", process.env.NODE_ENV);
    console.log("API Route - cwd:", process.cwd());
    
    const meetingTypes = await prisma.meetingType.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(meetingTypes);
  } catch (error: any) {
    console.error("Error fetching meeting types:", error);
    const errorMessage = error?.message || "Unknown error";
    const errorCode = error?.code || "UNKNOWN";
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: "Failed to fetch meeting types",
        message: errorMessage,
        code: errorCode,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
        cwd: process.cwd(),
      },
      { status: 500 }
    );
  }
}
