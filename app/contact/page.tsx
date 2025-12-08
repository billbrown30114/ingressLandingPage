import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Metadata } from "next";
import { ContactForm } from "@/components/landing/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
        
        <ContactForm />

        <div className="mt-12 text-center">
          <p className="text-lg mb-4">Or schedule a meeting directly:</p>
          <Link
            href="/schedule"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule a Meeting
          </Link>
        </div>
      </div>
    </main>
  );
}

