"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    service: "automation",
    title: "AI-Powered Automation",
    description: "Intelligent workflows that learn, adapt, and optimize your business processes 24/7.",
    gradient: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-400",
    image: "/ai-solutions/resources/automation.jpg",
    linkText: "Learn More",
    href: "/ai-solutions/services?service=automation",
  },
  {
    service: "analytics",
    title: "Predictive Analytics",
    description: "Machine learning models that forecast trends, prevent issues, and maximize opportunities.",
    gradient: "from-purple-500 to-pink-600",
    textColor: "text-purple-400",
    image: "/ai-solutions/resources/analytics.jpg",
    linkText: "Explore Analytics",
    href: "/ai-solutions/services?service=analytics",
  },
  {
    service: "agents",
    title: "Custom AI Agents",
    description: "Conversational AI assistants that handle customer service, scheduling, and data analysis.",
    gradient: "from-green-500 to-teal-600",
    textColor: "text-green-400",
    image: "/ai-solutions/resources/agents.jpg",
    linkText: "Meet Agents",
    href: "/ai-solutions/services?service=agents",
  },
  {
    service: "intelligence",
    title: "Real-Time Intelligence",
    description: "AI systems that process data instantly, making smart decisions in milliseconds.",
    gradient: "from-orange-500 to-red-600",
    textColor: "text-orange-400",
    image: "/ai-solutions/resources/intelligence.jpg",
    linkText: "View Intelligence",
    href: "/ai-solutions/services?service=intelligence",
  },
  {
    service: "industry",
    title: "Industry-Specific AI",
    description: "Specialized AI solutions for manufacturing, healthcare, retail, and professional services.",
    gradient: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-400",
    image: "/ai-solutions/resources/manufacturing.jpg",
    linkText: "Explore Industries",
    href: "/ai-solutions/solutions.html",
  },
  {
    service: "transformation",
    title: "AI Transformation",
    description: "Complete digital transformation powered by cutting-edge artificial intelligence.",
    gradient: "from-pink-500 to-rose-600",
    textColor: "text-pink-400",
    image: "/ai-solutions/resources/consulting.jpg",
    linkText: "Start Transformation",
    href: "/contact",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-800/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            AI Service Hub
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive suite of AI-powered solutions designed to transform your business operations and drive unprecedented growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative bg-gray-800 dark:bg-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 block overflow-hidden"
              data-service={service.service}
              style={{
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-orange-500/10 group-hover:via-blue-500/10 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 blur-2xl -z-10"></div>
              
              {/* Ripple effect container */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 scale-0 group-active:scale-150 group-active:opacity-0 transition-all duration-700 bg-white/20 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div 
                  className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="rounded object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white transition-all duration-300 group-hover:text-orange-300 group-hover:scale-105">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
                  {service.description}
                </p>
                <div className={`flex items-center ${service.textColor} font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105`}>
                  <span className="transition-all duration-300 group-hover:text-white">{service.linkText}</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
                </div>
              </div>
              
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-orange-500 group-hover:via-blue-500 group-hover:to-orange-500 transition-all duration-500"></div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
          >
            Explore All Solutions
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

