import { Navbar } from "@/components/layout/Navbar";
import { ApplicationDevSection } from "@/components/landing/ApplicationDevSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-First Application Development | Simplify, Modernize & Automate",
  description: "We design and build modern applications with intelligence baked in from the start. From assessing legacy code to deploying adaptive interfaces, our AI-first approach transforms development, accelerates delivery and unlocks new possibilities.",
};

export default function ApplicationDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ApplicationDevSection />
    </main>
  );
}
