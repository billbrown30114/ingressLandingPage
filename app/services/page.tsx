import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Metadata } from "next";
import { Brain, TrendingUp, Bot, Zap, Target, Rocket, Briefcase, Settings, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Solutions & Services",
  description: "Explore our comprehensive range of AI-powered solutions and services",
};

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
  {
    icon: Briefcase,
    title: "AI Consulting",
    description: "Expert guidance to help you navigate AI implementation and achieve your business objectives",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Settings,
    title: "Implementation Support",
    description: "End-to-end AI implementation services ensuring smooth deployment and integration",
    gradient: "from-orange-500 to-orange-600",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-orange-200" strokeWidth={2} />
              <span className="text-sm font-semibold text-orange-200">AI SOLUTIONS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent">
              AI Solutions That Transform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-3xl mx-auto">
              We don&apos;t just build software—we build intelligent systems that think, learn, and evolve with your business
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
            </div>
          ))}
        </div>

          <div className="text-center">
          <Link
            href="/schedule"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
          >
              <Rocket className="w-5 h-5" strokeWidth={2.5} />
              Start Your AI Journey
              <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
      </section>
    </main>
  );
}

