import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get availability settings (you may need to create an Availability model)
    // For now, return default availability
    const availability = [
      { dayOfWeek: 0, startTime: "09:00", endTime: "17:00", enabled: false }, // Sunday
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", enabled: true },  // Monday
      { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", enabled: true },  // Tuesday
      { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", enabled: true },  // Wednesday
      { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", enabled: true },  // Thursday
      { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", enabled: true },  // Friday
      { dayOfWeek: 6, startTime: "09:00", endTime: "17:00", enabled: false }, // Saturday
    ];

    return NextResponse.json({ availability });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { availability } = body;

    // Save availability settings (you may need to create an Availability model)
    // For now, just return success
    // TODO: Implement persistence of availability settings

    return NextResponse.json({ success: true, availability });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
