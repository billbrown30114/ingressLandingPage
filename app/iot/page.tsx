import { Navbar } from "@/components/layout/Navbar";
import { IoTSection } from "@/components/landing/IoTSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IoT & Connected Products | Unlocking Real-World Intelligence",
  description: "At Ingress Software we believe the future is physical and digital—together. Our Internet-of-Things (IoT) and connected-product team integrates sensors, controllers and cloud intelligence to turn equipment, buildings and infrastructure into smart, self-aware systems.",
};

export default function IoTPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <IoTSection />
    </main>
  );
}
