import { addMinutes, setHours, setMinutes, isWithinInterval, startOfDay, endOfDay } from "date-fns";

export type AvailabilityRule = {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  enabled: boolean;
};

export function getAvailableTimeSlots(
  date: Date,
  duration: number,
  availabilityRules: AvailabilityRule[],
  busySlots: Array<{ start: string; end: string }>,
  bufferMinutes: number = 15,
  minNoticeHours: number = 2
): string[] {
  const dayOfWeek = date.getDay();
  const rule = availabilityRules.find((r) => r.dayOfWeek === dayOfWeek);

  if (!rule || !rule.enabled) {
    return [];
  }

  const now = new Date();
  const minStartTime = addMinutes(now, minNoticeHours * 60);
  const dayStart = startOfDay(date);
  const [startHour, startMinute] = rule.startTime.split(":").map(Number);
  const [endHour, endMinute] = rule.endTime.split(":").map(Number);

  const availableStart = setMinutes(setHours(dayStart, startHour), startMinute);
  const availableEnd = setMinutes(setHours(dayStart, endHour), endMinute);

  const actualStart = availableStart > minStartTime ? availableStart : minStartTime;
  const slots: string[] = [];

  let currentTime = actualStart;

  while (addMinutes(currentTime, duration) <= availableEnd) {
    const slotEnd = addMinutes(currentTime, duration);
    const slotStartWithBuffer = addMinutes(currentTime, -bufferMinutes);
    const slotEndWithBuffer = addMinutes(slotEnd, bufferMinutes);

    const isBusy = busySlots.some((busy) => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      return (
        (busyStart >= slotStartWithBuffer && busyStart < slotEndWithBuffer) ||
        (busyEnd > slotStartWithBuffer && busyEnd <= slotEndWithBuffer) ||
        (busyStart <= slotStartWithBuffer && busyEnd >= slotEndWithBuffer)
      );
    });

    if (!isBusy) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      slots.push(timeString);
    }

    currentTime = addMinutes(currentTime, 30);
  }

  return slots;
}

