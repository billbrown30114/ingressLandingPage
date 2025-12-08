import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addMinutes, parseISO } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meetingTypeId, startTime, visitorName, visitorEmail, visitorPhone, notes } = body;

    if (!meetingTypeId || !startTime || !visitorName || !visitorEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get meeting type to determine duration
    const meetingType = await prisma.meetingType.findUnique({
      where: { id: meetingTypeId },
    });

    if (!meetingType) {
      return NextResponse.json(
        { error: "Meeting type not found" },
        { status: 404 }
      );
    }

    // Get first staff user (for now, we'll use the first user)
    // TODO: Allow selecting which staff member to book with
    const staffUser = await prisma.user.findFirst();

    if (!staffUser) {
      return NextResponse.json(
        { error: "No staff members available" },
        { status: 404 }
      );
    }

    const start = parseISO(startTime);
    const end = addMinutes(start, meetingType.duration);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        meetingTypeId,
        staffUserId: staffUser.id,
        visitorName,
        visitorEmail,
        visitorPhone: visitorPhone || null,
        notes: notes || null,
        startTime: start,
        endTime: end,
        status: "CONFIRMED",
      },
      include: {
        meetingType: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
