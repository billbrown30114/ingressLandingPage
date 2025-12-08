"use client";

import { useState, useEffect } from "react";

type Availability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  enabled: boolean;
};

export function AvailabilityEditor() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await fetch("/api/admin/availability");
      const data = await res.json();
      setAvailability(data.availability || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch availability:", error);
      setLoading(false);
    }
  };

  const updateAvailability = async (updated: Availability[]) => {
    try {
      const res = await fetch("/api/admin/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability: updated }),
      });
      if (res.ok) {
        setAvailability(updated);
      }
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  const handleChange = (index: number, field: keyof Availability, value: any) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
    updateAvailability(updated);
  };

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Availability Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
        <div className="space-y-4">
          {days.map((day, index) => {
            const dayAvailability = availability.find((a) => a.dayOfWeek === index) || {
              dayOfWeek: index,
              startTime: "09:00",
              endTime: "17:00",
              enabled: false,
            };
            return (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-24 font-semibold">{day}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={dayAvailability.enabled}
                    onChange={(e) =>
                      handleChange(
                        availability.findIndex((a) => a.dayOfWeek === index) >= 0
                          ? availability.findIndex((a) => a.dayOfWeek === index)
                          : availability.length,
                        "enabled",
                        e.target.checked
                      )
                    }
                  />
                  <span>Available</span>
                </label>
                {dayAvailability.enabled && (
                  <>
                    <input
                      type="time"
                      value={dayAvailability.startTime}
                      onChange={(e) =>
                        handleChange(
                          availability.findIndex((a) => a.dayOfWeek === index) >= 0
                            ? availability.findIndex((a) => a.dayOfWeek === index)
                            : availability.length,
                          "startTime",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border rounded-lg"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={dayAvailability.endTime}
                      onChange={(e) =>
                        handleChange(
                          availability.findIndex((a) => a.dayOfWeek === index) >= 0
                            ? availability.findIndex((a) => a.dayOfWeek === index)
                            : availability.length,
                          "endTime",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border rounded-lg"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

