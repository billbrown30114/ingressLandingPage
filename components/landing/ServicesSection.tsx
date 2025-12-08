"use client";

import Link from "next/link";
import { Brain, TrendingUp, Bot, Zap, Target, Rocket } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI-Powered Automation",
    description: "Intelligent workflows that learn, adapt, and optimize your business processes 24/7",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Machine learning models that forecast trends, prevent issues, and maximize opportunities",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Conversational AI assistants that handle customer service, scheduling, and data analysis",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    icon: Zap,
    title: "Real-Time Intelligence",
    description: "AI systems that process data instantly, making smart decisions in milliseconds",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Target,
    title: "Industry-Specific AI",
    description: "Specialized AI solutions for manufacturing, healthcare, retail, and professional services",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Rocket,
    title: "AI Transformation",
    description: "Complete digital transformation powered by cutting-edge artificial intelligence",
    gradient: "from-orange-600 to-blue-600",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 rounded-full">
            <span className="text-sm font-bold text-orange-700 dark:text-orange-300">AI CAPABILITIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            AI Solutions That Transform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We don&apos;t just build software—we build intelligent systems that think, learn, and evolve with your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-12 h-12 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
          >
            Explore All AI Solutions
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

