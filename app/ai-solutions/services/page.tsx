"use client";

import { Navbar } from "@/components/layout/Navbar";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function AIServicesContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const [activeService, setActiveService] = useState(serviceParam || "automation");
  const [ripples, setRipples] = useState<Array<{ id: number; serviceId: string; x: number; y: number }>>([]);

  useEffect(() => {
    if (serviceParam && ["automation", "analytics", "agents", "intelligence"].includes(serviceParam)) {
      setActiveService(serviceParam);
    }
  }, [serviceParam]);

  const handleServiceClick = (serviceId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveService(serviceId);
    
    // Create ripple effect
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const rippleId = Date.now();
    setRipples((prev) => [...prev, { id: rippleId, serviceId, x, y }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);
  };

  const services = [
    {
      id: "automation",
      title: "AI Automation",
      subtitle: "Smart workflows & process optimization",
      iconGradient: "from-orange-500 to-orange-600",
      image: "/ai-solutions/resources/automation.jpg",
    },
    {
      id: "analytics",
      title: "Predictive Analytics",
      subtitle: "Forecasting & trend analysis",
      iconGradient: "from-blue-500 to-blue-600",
      image: "/ai-solutions/resources/analytics.jpg",
    },
    {
      id: "agents",
      title: "AI Agents",
      subtitle: "Conversational AI assistants",
      iconGradient: "from-orange-600 to-blue-600",
      image: "/ai-solutions/resources/agents.jpg",
    },
    {
      id: "intelligence",
      title: "Real-Time AI",
      subtitle: "Instant decision-making systems",
      iconGradient: "from-orange-500 to-blue-500",
      image: "/ai-solutions/resources/intelligence.jpg",
    },
  ];

  const serviceContent = {
    automation: {
      title: "AI-Powered Automation",
      description: "Transform your business operations with intelligent workflows that learn, adapt, and optimize processes 24/7. Our AI automation solutions reduce manual effort by up to 85% while improving accuracy and efficiency.",
      features: [
        {
          title: "Smart Workflow Design",
          description: "Automatically design and optimize business processes using machine learning algorithms.",
        },
        {
          title: "Continuous Learning",
          description: "Systems that adapt and improve over time, learning from your business patterns.",
        },
        {
          title: "Error Reduction",
          description: "Eliminate human errors and ensure consistent process execution across all operations.",
        },
      ],
      image: "/ai-solutions/resources/automation.jpg",
      imagePosition: "right",
    },
    analytics: {
      title: "Predictive Analytics",
      description: "Harness the power of machine learning to forecast trends, prevent issues, and identify opportunities before they emerge. Our predictive models achieve 96% accuracy in trend forecasting.",
      features: [
        {
          title: "Advanced Forecasting",
          description: "Predict market trends, customer behavior, and operational outcomes with unprecedented accuracy.",
        },
        {
          title: "Risk Assessment",
          description: "Identify potential risks and opportunities before they impact your business operations.",
        },
        {
          title: "Real-Time Insights",
          description: "Get instant analytics and recommendations based on current data patterns.",
        },
      ],
      image: "/ai-solutions/resources/analytics.jpg",
      imagePosition: "left",
    },
    agents: {
      title: "Custom AI Agents",
      description: "Deploy intelligent conversational AI assistants that handle customer service, scheduling, and data analysis tasks 24/7. Our AI agents understand context and provide human-like interactions.",
      features: [
        {
          title: "Natural Language Processing",
          description: "Advanced NLP capabilities for understanding and responding to complex queries.",
        },
        {
          title: "Multi-Channel Support",
          description: "Deploy across web, mobile, social media, and voice platforms seamlessly.",
        },
        {
          title: "Intelligent Escalation",
          description: "Smart routing to human agents when complex issues require personal attention.",
        },
      ],
      image: "/ai-solutions/resources/agents.jpg",
      imagePosition: "right",
    },
    intelligence: {
      title: "Real-Time Intelligence",
      description: "Process data instantly with AI systems that make smart decisions in milliseconds. Perfect for high-frequency trading, real-time monitoring, and instant response systems.",
      features: [
        {
          title: "Sub-Millisecond Response",
          description: "Ultra-fast processing capabilities for time-critical applications and decisions.",
        },
        {
          title: "Stream Processing",
          description: "Handle massive data streams in real-time without latency or bottlenecks.",
        },
        {
          title: "Adaptive Decision Making",
          description: "Systems that adapt their decision-making based on real-time conditions and outcomes.",
        },
      ],
      image: "/ai-solutions/resources/intelligence.jpg",
      imagePosition: "left",
    },
  };

  const currentContent = serviceContent[activeService as keyof typeof serviceContent];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent">
                AI Services
              </span>
            </h1>
            <p className="text-2xl text-blue-200 max-w-4xl mx-auto">
              Comprehensive artificial intelligence solutions designed to transform your business operations, enhance decision-making, and drive sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Service Selector */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={(e) => handleServiceClick(service.id, e)}
                className={`service-tab relative bg-white dark:bg-gray-800 p-6 rounded-xl text-left transition-all duration-300 border overflow-hidden group ${
                  activeService === service.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 scale-105 shadow-2xl shadow-orange-500/20 ring-2 ring-orange-500/50"
                    : "border-gray-200 dark:border-gray-700 hover:scale-102 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700"
                }`}
                style={{
                  transform: activeService === service.id ? 'scale(1.05) rotate(0deg)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Ripple effects */}
                {ripples
                  .filter((ripple) => ripple.serviceId === service.id)
                  .map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute rounded-full bg-gradient-to-r from-orange-400/60 to-blue-400/60 pointer-events-none"
                      style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                        animation: 'ripple 0.6s ease-out',
                      }}
                    />
                  ))}
                
                {/* Ripple effect background */}
                {activeService === service.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 animate-pulse"></div>
                )}
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  activeService === service.id 
                    ? 'opacity-100 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-blue-500/20 blur-xl' 
                    : 'opacity-0 group-hover:opacity-50'
                }`}></div>
                
                <div className="relative z-10">
                  <div 
                    className={`w-12 h-12 bg-gradient-to-r ${service.iconGradient} rounded-lg flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 ${
                      activeService === service.id 
                        ? 'scale-110 rotate-6 shadow-lg' 
                        : 'group-hover:scale-105 group-hover:rotate-3'
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="rounded object-cover transition-transform duration-300"
                    />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${
                    activeService === service.id
                      ? 'text-orange-600 dark:text-orange-400 scale-105'
                      : 'text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    activeService === service.id
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {service.subtitle}
                  </p>
                </div>
                
                {/* Active indicator pulse */}
                {activeService === service.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-500"
            style={{
              animation: 'fadeInUp 0.5s ease-out',
            }}
          >
            <style jsx>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {currentContent.imagePosition === "left" && (
                <div>
                  <Image
                    src={currentContent.image}
                    alt={currentContent.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              )}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  {currentContent.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  {currentContent.description}
                </p>
                <div className="space-y-6">
                  {currentContent.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-orange-600 to-blue-600 px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-blue-500 transition-all mt-8 text-white"
                >
                  Learn More
                </Link>
              </div>
              {currentContent.imagePosition === "right" && (
                <div>
                  <Image
                    src={currentContent.image}
                    alt={currentContent.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">Ready to Implement AI?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Schedule a consultation with our AI experts to discuss your specific needs and create a custom implementation plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="border border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AIServicesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    }>
      <AIServicesContent />
    </Suspense>
  );
}
