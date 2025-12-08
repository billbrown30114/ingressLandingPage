"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

type MeetingType = {
  id: string;
  title: string;
  duration: number;
};

type Props = {
  meetingType: MeetingType;
  onDateSelect: (date: Date) => void;
  onBack: () => void;
};

export function CalendarPicker({ meetingType, onDateSelect, onBack }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  const handleDateClick = (date: Date) => {
    if (date < today) return;
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="text-orange-600 hover:text-orange-700 mb-6 font-semibold transition-colors"
      >
        ← Back
      </button>
      <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
        Select a Date
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        {meetingType.title} - {meetingType.duration} minutes
      </p>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => {
          const isPast = date < today;
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={isPast}
              className={`
                p-4 rounded-lg border text-center font-medium transition-all duration-200
                ${isPast ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:bg-gradient-to-br hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900 dark:hover:to-blue-900 cursor-pointer hover:border-orange-400"}
                ${isSelected ? "bg-gradient-to-r from-orange-600 to-blue-600 text-white border-transparent shadow-lg transform scale-105" : ""}
              `}
            >
              <div className="text-sm font-semibold">{format(date, "d")}</div>
              <div className="text-xs text-gray-500">{format(date, "MMM")}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

