"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { X, Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

type MeetingType = {
  id: string;
  title: string;
  duration: number;
  description: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingData: {
    meetingTypeId: string;
    selectedDate: Date;
    selectedTime: string;
    visitorName: string;
    visitorEmail: string;
    visitorPhone: string;
    notes: string;
  }) => void;
};

export function BookingModal({ isOpen, onClose, onSuccess }: Props) {
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchMeetingTypes();
    }
  }, [isOpen]);

  const fetchAvailability = useCallback(async () => {
    if (!selectedDate || !selectedMeetingType) return;

    setLoadingSlots(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const res = await fetch(
        `/api/schedule/availability?date=${dateStr}&meetingTypeId=${selectedMeetingType.id}`
      );
      const data = await res.json();
      if (data.slots && Array.isArray(data.slots)) {
        setAvailableSlots(data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Failed to fetch availability:", error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate, selectedMeetingType]);

  useEffect(() => {
    if (selectedDate && selectedMeetingType) {
      fetchAvailability();
    }
  }, [selectedDate, selectedMeetingType, fetchAvailability]);

  const fetchMeetingTypes = async () => {
    try {
      const res = await fetch("/api/schedule/meeting-types");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMeetingTypes(data);
        if (data.length > 0) {
          setSelectedMeetingType(data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch meeting types:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedMeetingType) {
      setError("Please select a meeting type");
      return;
    }

    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    if (!selectedTime) {
      setError("Please select a time slot");
      return;
    }

    if (!formData.visitorName || !formData.visitorEmail) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const startTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`).toISOString();
      
      const res = await fetch("/api/schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingTypeId: selectedMeetingType.id,
          startTime,
          visitorName: formData.visitorName,
          visitorEmail: formData.visitorEmail,
          visitorPhone: formData.visitorPhone,
          notes: formData.notes,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      const data = await res.json();
      setShowConfirmation(true);
      onSuccess({
        meetingTypeId: selectedMeetingType.id,
        selectedDate: selectedDate,
        selectedTime,
        ...formData,
      });
    } catch (error: any) {
      setError(error.message || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setShowConfirmation(false);
      setSelectedDate(null);
      setSelectedTime("");
      setFormData({
        visitorName: "",
        visitorEmail: "",
        visitorPhone: "",
        notes: "",
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all animate-scale-in">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 px-8 py-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-400/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Schedule a Meeting</h2>
                <p className="text-sm text-white/90 mt-1">Book your AI consultation</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <X className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {showConfirmation ? (
            <div className="text-center py-12">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-6">
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Booking Confirmed!
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Your meeting has been scheduled successfully. A confirmation email has been sent to your inbox.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">{selectedMeetingType?.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>{selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meeting Type */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Meeting Type *
                </label>
                <div className="relative">
                  <select
                    value={selectedMeetingType?.id || ""}
                    onChange={(e) => {
                      const type = meetingTypes.find((t) => t.id === e.target.value);
                      setSelectedMeetingType(type || null);
                      setSelectedDate(null);
                      setSelectedTime("");
                    }}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium appearance-none cursor-pointer hover:border-orange-300 dark:hover:border-orange-600"
                    required
                  >
                    <option value="">Select a meeting type</option>
                    {meetingTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.title} ({type.duration} min)
                      </option>
                    ))}
                  </select>
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
                </div>
              </div>

              {/* Date Picker */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    min={format(new Date(), "yyyy-MM-dd")}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:border-blue-300 dark:hover:border-blue-600"
                    required
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Time *
                  </label>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-medium">Loading available times...</span>
                      </div>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 p-4 rounded-xl">
                      <p className="text-yellow-800 dark:text-yellow-300 font-medium flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        No available time slots for this date. Please select a different date.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 transform ${
                            selectedTime === slot
                              ? "bg-gradient-to-r from-orange-600 to-blue-600 text-white border-transparent shadow-lg scale-105"
                              : "hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900/20 dark:hover:to-blue-900/20 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:scale-105"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Visitor Information */}
              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8 space-y-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900/30 dark:to-blue-900/30 rounded-lg">
                    <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-black bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                    Your Information
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                      <User className="w-4 h-4 text-orange-600" />
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.visitorName}
                        onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-orange-300 dark:hover:border-orange-600"
                        placeholder="John Doe"
                        required
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.visitorEmail}
                        onChange={(e) => setFormData({ ...formData, visitorEmail: e.target.value })}
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-600"
                        placeholder="john@example.com"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-orange-600" />
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.visitorPhone}
                      onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-orange-300 dark:hover:border-orange-600"
                      placeholder="(555) 123-4567"
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Notes/Agenda
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none hover:border-blue-300 dark:hover:border-blue-600"
                      placeholder="Any specific topics you'd like to discuss..."
                    />
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-xl font-medium flex items-center gap-2">
                  <X className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedTime || availableSlots.length === 0}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white rounded-xl font-bold hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

