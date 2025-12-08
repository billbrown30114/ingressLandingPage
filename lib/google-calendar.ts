import { google } from "googleapis";
import { getAuthenticatedClient } from "./google-service-account";

/**
 * Create a calendar event on behalf of a staff member
 * @param staffEmail - Email of the staff member whose calendar to use
 * @param eventData - Event details
 */
export async function createCalendarEvent(
  staffEmail: string,
  eventData: {
    summary: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendeeEmail: string;
    location?: string;
  }
) {
  const auth = getAuthenticatedClient(staffEmail);
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: eventData.summary,
    description: eventData.description,
    start: {
      dateTime: eventData.startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventData.endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [
      { email: eventData.attendeeEmail },
      { email: staffEmail }, // Add staff member as attendee
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 60 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    conferenceDataVersion: 1,
  });

  return response.data;
}

/**
 * Get calendar availability for a staff member
 * @param staffEmail - Email of the staff member
 * @param startTime - Start of time range to check
 * @param endTime - End of time range to check
 */
export async function getCalendarAvailability(
  staffEmail: string,
  startTime: Date,
  endTime: Date
) {
  const auth = getAuthenticatedClient(staffEmail);
  const calendar = google.calendar({ version: "v3", auth });

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      items: [{ id: staffEmail }],
    },
  });

  return response.data.calendars?.[staffEmail]?.busy || [];
}
