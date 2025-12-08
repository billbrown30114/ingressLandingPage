import { Metadata } from "next";
import { SchedulingInterface } from "@/components/scheduling/SchedulingInterface";

export const metadata: Metadata = {
  title: "Schedule a Meeting",
  description: "Book a meeting with our team",
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <SchedulingInterface />
    </main>
  );
}

