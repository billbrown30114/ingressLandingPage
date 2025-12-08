"use client";

import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { Navbar } from "@/components/layout/Navbar";

export function SchedulingInterface() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-orange-200">Schedule Your Meeting</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent">
              Schedule Your Consultation
            </h1>
            <p className="text-lg text-blue-200 mb-8">
              Book a meeting to discuss how we can help transform your business
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Schedule a Meeting
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Click the button above to open the booking form and schedule your meeting.
          </p>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Modal handles its own confirmation
        }}
      />
    </div>
  );
}

