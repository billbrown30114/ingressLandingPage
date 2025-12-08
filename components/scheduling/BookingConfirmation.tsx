"use client";

import { format, addMinutes } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";

type BookingData = {
  meetingTypeId: string;
  selectedDate: Date;
  selectedTime: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  notes: string;
};

type MeetingType = {
  id: string;
  title: string;
  duration: number;
};

type Props = {
  bookingData: BookingData;
};

export function BookingConfirmation({ bookingData }: Props) {
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  
  useEffect(() => {
    // Fetch meeting type details to get duration
    fetch(`/api/schedule/meeting-types`)
      .then((res) => res.json())
      .then((types: MeetingType[]) => {
        const type = types.find((t) => t.id === bookingData.meetingTypeId);
        if (type) setMeetingType(type);
      })
      .catch((err) => console.error("Failed to fetch meeting type:", err));
  }, [bookingData.meetingTypeId]);

  const meetingDateTime = new Date(
    `${bookingData.selectedDate.toISOString().split("T")[0]}T${bookingData.selectedTime}`
  );

  const duration = meetingType?.duration || 30; // Default to 30 minutes if not found
  const endDateTime = addMinutes(meetingDateTime, duration);

  const addToGoogleCalendar = () => {
    const startTime = meetingDateTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endTime = endDateTime
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
    
    const title = encodeURIComponent(meetingType?.title || "Meeting");
    const details = [
      `Meeting with ${bookingData.visitorName}`,
      bookingData.visitorEmail && `Email: ${bookingData.visitorEmail}`,
      bookingData.visitorPhone && `Phone: ${bookingData.visitorPhone}`,
      bookingData.notes && `Notes: ${bookingData.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}`;
    window.open(url, "_blank");
  };

  const addToAppleCalendar = () => {
    // Format dates for .ics file (YYYYMMDDTHHMMSS)
    const formatICSDate = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const startICS = formatICSDate(meetingDateTime);
    const endICS = formatICSDate(endDateTime);

    // Escape special characters in description
    const escapeICS = (text: string) => {
      return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    };

    const description = [
      `Meeting with ${bookingData.visitorName}`,
      bookingData.visitorEmail && `Email: ${bookingData.visitorEmail}`,
      bookingData.visitorPhone && `Phone: ${bookingData.visitorPhone}`,
      bookingData.notes && `Notes: ${bookingData.notes}`,
    ]
      .filter(Boolean)
      .join("\\n");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Meeting Scheduler//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}-${Math.random().toString(36).substring(7)}@meetingscheduler`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${startICS}`,
      `DTEND:${endICS}`,
      `SUMMARY:${escapeICS(meetingType?.title || "Meeting")}`,
      `DESCRIPTION:${escapeICS(description)}`,
      `LOCATION:`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT1H",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: ${meetingType?.title || "Meeting"} in 1 hour`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Create blob and download
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `meeting-${format(meetingDateTime, "yyyy-MM-dd")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4 text-green-800">Booking Confirmed!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your meeting has been scheduled successfully. A confirmation email has been sent to{" "}
          <strong>{bookingData.visitorEmail}</strong>.
        </p>

        <div className="bg-white rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-semibold mb-4">Meeting Details</h2>
          <div className="space-y-2">
            <p><strong>Date:</strong> {format(meetingDateTime, "MMMM d, yyyy")}</p>
            <p><strong>Time:</strong> {format(meetingDateTime, "h:mm a")}</p>
            <p><strong>Attendee:</strong> {bookingData.visitorName}</p>
            <p><strong>Email:</strong> {bookingData.visitorEmail}</p>
            {bookingData.visitorPhone && (
              <p><strong>Phone:</strong> {bookingData.visitorPhone}</p>
            )}
            {bookingData.notes && (
              <p><strong>Notes:</strong> {bookingData.notes}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={addToGoogleCalendar}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Google Calendar
            </button>
            <button
              onClick={addToAppleCalendar}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Add to Apple Calendar
            </button>
          </div>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

