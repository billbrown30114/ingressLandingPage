import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const endOfToday = new Date(now.setHours(23, 59, 59, 999));

    const todayMeetings = await prisma.booking.count({
      where: {
        startTime: {
          gte: startOfToday,
          lte: endOfToday,
        },
        status: "CONFIRMED",
      },
    });

    const upcomingMeetings = await prisma.booking.count({
      where: {
        startTime: {
          gt: endOfToday,
        },
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({
      todayMeetings,
      upcomingMeetings,
      pendingInvites: 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
