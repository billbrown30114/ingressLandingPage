import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/gmail";

function generateContactFormEmail(data: {
  name: string;
  email: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .info-box { background-color: #ffffff; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p>You have received a new message from your website contact form:</p>
          <div class="info-box">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>You can reply directly to this email to respond to ${data.name}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get first staff user to send email to
    const staffUser = await prisma.user.findFirst();

    if (!staffUser || !staffUser.email) {
      return NextResponse.json(
        { error: "No staff members available to receive messages" },
        { status: 404 }
      );
    }

    // Send email to staff member
    try {
      const fromEmail = process.env.SMTP_USER || staffUser.email || "noreply@ingresssoftware.com";
      const contactEmailHtml = generateContactFormEmail({
        name,
        email,
        message,
      });

      await sendEmail(fromEmail, {
        to: staffUser.email,
        subject: `New Contact Form Message from ${name}`,
        htmlBody: contactEmailHtml,
      });
    } catch (emailError) {
      console.error("Error sending contact form email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
