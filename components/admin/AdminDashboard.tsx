"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { AvailabilityEditor } from "./AvailabilityEditor";
import { MeetingTypeEditor } from "./MeetingTypeEditor";
import { BookingsList } from "./BookingsList";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

type Stats = {
  todayMeetings: number;
  upcomingMeetings: number;
  pendingInvites: number;
};

export function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "availability" | "meeting-types">("dashboard");
  const [stats, setStats] = useState<Stats>({
    todayMeetings: 0,
    upcomingMeetings: 0,
    pendingInvites: 0,
  });

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to access the admin portal.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "dashboard"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "bookings"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "availability"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Availability
          </button>
          <button
            onClick={() => setActiveTab("meeting-types")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "meeting-types"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Meeting Types
          </button>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-2">Today&apos;s Meetings</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.todayMeetings}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-2">Upcoming Meetings</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.upcomingMeetings}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-2">Pending Invites</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.pendingInvites}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && <BookingsList />}
        {activeTab === "availability" && <AvailabilityEditor />}
        {activeTab === "meeting-types" && <MeetingTypeEditor />}
      </div>
    </div>
  );
}

