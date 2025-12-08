import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableTimeSlots, AvailabilityRule } from "@/lib/availability";
import { startOfDay, parseISO } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get("date");
    const meetingTypeId = searchParams.get("meetingTypeId");

    if (!dateStr || !meetingTypeId) {
      return NextResponse.json(
        { error: "Missing date or meetingTypeId parameter" },
        { status: 400 }
      );
    }

    const date = parseISO(dateStr);
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

    // Get default availability rules
    const defaultAvailability = staffUser.defaultAvailability as AvailabilityRule[] | null;
    const availabilityRules: AvailabilityRule[] = defaultAvailability || [
      {
        dayOfWeek: 1, // Monday
        startTime: "09:00",
        endTime: "17:00",
        enabled: true,
      },
      {
        dayOfWeek: 2, // Tuesday
        startTime: "09:00",
        endTime: "17:00",
        enabled: true,
      },
      {
        dayOfWeek: 3, // Wednesday
        startTime: "09:00",
        endTime: "17:00",
        enabled: true,
      },
      {
        dayOfWeek: 4, // Thursday
        startTime: "09:00",
        endTime: "17:00",
        enabled: true,
      },
      {
        dayOfWeek: 5, // Friday
        startTime: "09:00",
        endTime: "17:00",
        enabled: true,
      },
    ];

    // Get existing bookings for this date
    const dayStart = startOfDay(date);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const bookings = await prisma.booking.findMany({
      where: {
        staffUserId: staffUser.id,
        startTime: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          not: "CANCELLED",
        },
      },
    });

    const busySlots = bookings.map((booking) => ({
      start: booking.startTime.toISOString(),
      end: booking.endTime.toISOString(),
    }));

    const slots = getAvailableTimeSlots(
      date,
      meetingType.duration,
      availabilityRules,
      busySlots
    );

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
