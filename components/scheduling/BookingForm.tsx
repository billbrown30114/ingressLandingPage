"use client";

import { useState } from "react";
import { format } from "date-fns";

type MeetingType = {
  id: string;
  title: string;
  duration: number;
};

type Props = {
  meetingType: MeetingType;
  selectedDate: Date;
  availableSlots: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onSubmit: (data: {
    visitorName: string;
    visitorEmail: string;
    visitorPhone: string;
    notes: string;
  }) => void;
  onBack: () => void;
};

export function BookingForm({
  meetingType,
  selectedDate,
  availableSlots,
  selectedTime,
  onTimeSelect,
  onSubmit,
  onBack,
}: Props) {
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }
    onSubmit(formData);
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
        Book Your AI Consultation
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        {meetingType.title} on {format(selectedDate, "MMMM d, yyyy")}
      </p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Select a Time</h2>
        {availableSlots.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
            <p className="font-semibold mb-1">No available time slots</p>
            <p className="text-sm">
              There are no available time slots for this date. Please select a different date or check availability settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => onTimeSelect(slot)}
                className={`
                  p-3 rounded-lg border text-sm font-medium transition-all duration-200
                  ${selectedTime === slot
                    ? "bg-gradient-to-r from-orange-600 to-blue-600 text-white border-transparent shadow-lg transform scale-105"
                    : "hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900 dark:hover:to-blue-900 border-gray-300 hover:border-orange-400"
                  }
                `}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
        {selectedTime && (
          <p className="mt-3 text-sm text-green-600 font-medium">
            ✓ Selected: {selectedTime}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.visitorName}
            onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.visitorEmail}
            onChange={(e) => setFormData({ ...formData, visitorEmail: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.visitorPhone}
            onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes / Agenda (optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedTime || availableSlots.length === 0}
          className="w-full bg-gradient-to-r from-orange-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
        >
          {!selectedTime ? "Please select a time slot" : "Confirm Your AI Consultation"}
        </button>
      </form>
    </div>
  );
}

