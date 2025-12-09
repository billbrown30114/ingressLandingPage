import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addMinutes, parseISO, format } from "date-fns";
import { sendEmail, generateConfirmationEmail, generateStaffNotificationEmail } from "@/lib/gmail";

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

    // Send confirmation email to visitor
    try {
      const fromEmail = process.env.SMTP_USER || staffUser.email || "noreply@ingresssoftware.com";
      const confirmationEmailHtml = generateConfirmationEmail({
        visitorName,
        meetingDate: format(start, "MMMM d, yyyy"),
        meetingTime: format(start, "h:mm a"),
        duration: meetingType.duration,
      });

      await sendEmail(fromEmail, {
        to: visitorEmail,
        subject: `Meeting Confirmed: ${meetingType.title}`,
        htmlBody: confirmationEmailHtml,
      });

      // Send notification email to staff member
      if (staffUser.email) {
        const staffEmailHtml = generateStaffNotificationEmail({
          visitorName,
          visitorEmail,
          visitorPhone: visitorPhone || undefined,
          meetingDate: format(start, "MMMM d, yyyy"),
          meetingTime: format(start, "h:mm a"),
          duration: meetingType.duration,
          meetingType: meetingType.title,
          notes: notes || undefined,
        });

        await sendEmail(fromEmail, {
          to: staffUser.email,
          subject: `New Meeting Scheduled: ${meetingType.title}`,
          htmlBody: staffEmailHtml,
        });
      }
    } catch (emailError) {
      // Log email error but don't fail the booking creation
      console.error("Error sending confirmation emails:", emailError);
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
