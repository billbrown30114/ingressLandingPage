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

    const meetingTypes = await prisma.meetingType.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(meetingTypes);
  } catch (error) {
    console.error("Error fetching meeting types:", error);
    return NextResponse.json(
      { error: "Failed to fetch meeting types" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, duration, description } = body;

    if (!title || !duration) {
      return NextResponse.json(
        { error: "Title and duration are required" },
        { status: 400 }
      );
    }

    const meetingType = await prisma.meetingType.create({
      data: {
        title,
        duration: parseInt(duration),
        description: description || null,
      },
    });

    return NextResponse.json(meetingType);
  } catch (error) {
    console.error("Error creating meeting type:", error);
    return NextResponse.json(
      { error: "Failed to create meeting type" },
      { status: 500 }
    );
  }
}
