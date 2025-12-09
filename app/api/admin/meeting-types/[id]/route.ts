import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, duration, description } = body;

    const meetingType = await prisma.meetingType.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(duration && { duration: parseInt(duration) }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(meetingType);
  } catch (error) {
    console.error("Error updating meeting type:", error);
    return NextResponse.json(
      { error: "Failed to update meeting type" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.meetingType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting meeting type:", error);
    return NextResponse.json(
      { error: "Failed to delete meeting type" },
      { status: 500 }
    );
  }
}
