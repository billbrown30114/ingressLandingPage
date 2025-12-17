"use client";

import { Wifi, Cloud, BarChart3, Brain, Sun, Building2, ShoppingCart, Database, CheckCircle2, MapPin, AlertTriangle, TrendingUp, Shield, Zap } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    icon: Wifi,
    title: "Connected Device Integration",
    description: "Sensor networks, RFID/NFC readers and low‑power controllers",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Cloud,
    title: "Edge and Cloud Platforms",
    description: "Secure device provisioning, MQTT messaging and data pipelines",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: BarChart3,
    title: "Real‑Time Dashboards & Analytics",
    description: "Visualizing trends, setting alerts and analyzing patterns to drive action",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Brain,
    title: "AI/ML Integration",
    description: "Anomaly detection, predictive forecasting and autonomous decision‑making",
    gradient: "from-orange-600 to-blue-600",
  },
];

const caseStudies = [
  {
    title: "Connected Products",
    subtitle: "Remote Solar Management",
    icon: Sun,
    gradient: "from-orange-500 to-yellow-500",
    challenge: "Off‑grid solar deployments in remote locations require costly site visits for maintenance, and system issues can go unnoticed until failure.",
    solution: "Mobile 1st, Web‑based platform for managing solar charge controllers and inverters with real‑time monitoring, alerts, and remote configuration.",
    features: [
      "Multi‑site view with map clustering and keyword filtering",
      "Real‑time dashboards with important alerts front and center",
      "Built‑in graphing tools for controller data analysis",
      "Remote device activation and ownership assignment",
    ],
    outcome: "Transformed isolated equipment into an interconnected fleet—reducing downtime, lowering maintenance costs and improving energy reliability.",
  },
  {
    title: "Intelligent Asset Tracking",
    subtitle: "Scalable Real‑Time Visibility",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    challenge: "Building systems, vehicles and machinery siloed across different hardware and protocols, leading to inaccurate data and manual reporting.",
    solution: "Asset‑tracking and real‑time monitoring solutions that unify thousands of assets into a single pane of glass.",
    features: [
      "Rapid deployment across 200+ buildings within weeks",
      "Unified visibility into HVAC, lighting and safety systems",
      "Custom dashboards, heat maps and alerts",
      "Optimized inventory levels and equipment usage tracking",
      "Predictive maintenance scheduling",
      "Geofencing for loss prevention",
    ],
    outcome: "Significant ROI, real‑time insight into tens of thousands of devices, and a strong foundation for sustainability initiatives.",
  },
  {
    title: "RFID Kiosks & Self‑Service",
    subtitle: "Streamlined Property Rental",
    icon: ShoppingCart,
    gradient: "from-purple-500 to-pink-500",
    challenge: "Manual check‑in/out and inventory management for property rentals creates friction and staff workload.",
    solution: "RFID‑enabled kiosks that streamline check‑in/out and inventory management with tap‑to‑rent functionality.",
    features: [
      "Simple tap‑to‑rent at kiosk",
      "Automatic transaction recording",
      "Real‑time availability updates",
      "Overdue item alerts",
    ],
    outcome: "Frictionless self‑service experience that reduces staff workload and provides accurate, real‑time inventory data.",
  },
  {
    title: "NFC & RFID Integration",
    subtitle: "Contactless Customer Experience",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500",
    challenge: "Integrating contactless technology as a core part of the customer experience.",
    solution: "RFID and NFC capabilities enabling users to exchange information or initiate transactions by tapping a card or phone.",
    features: [
      "Embedded firmware for NFC hardware",
      "Secure backend communication",
      "Responsive cloud service with instant profile updates",
      "Seamless data capture and analytics",
    ],
    outcome: "Quick, contactless interactions for customers while providing seamless data capture and analytics.",
  },
  {
    title: "Robust IoT Backend",
    subtitle: "Enterprise‑Grade Data Platform",
    icon: Database,
    gradient: "from-indigo-500 to-blue-600",
    challenge: "Need for a backend that could ingest high‑volume device data, process it in real time and expose it through secure APIs.",
    solution: "Cloud‑native IoT backend featuring scalable microservices, MQTT messaging, authentication, and a data warehouse optimized for analytics.",
    features: [
      "Scalable microservices architecture",
      "MQTT messaging for device communication",
      "Enterprise‑grade security and compliance",
      "Data warehouse optimized for analytics",
      "Secure APIs for web and mobile applications",
      "Business logic execution and notification triggers",
    ],
    outcome: "Complete platform allowing clients to connect sensors and devices, run business logic, trigger notifications and power dashboards with enterprise‑grade security.",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Optimize Inventory Levels",
    description: "Know exactly what is in stock and avoid over‑ or under‑buying",
  },
  {
    icon: MapPin,
    title: "Understand Equipment Usage",
    description: "Track generators, vehicles and other equipment to redeploy underutilized assets",
  },
  {
    icon: AlertTriangle,
    title: "Predictive Maintenance",
    description: "Schedule maintenance based on real‑time usage rather than fixed intervals",
  },
  {
    icon: Shield,
    title: "Reduce Loss and Theft",
    description: "Use geofencing to see when valuable assets leave a job site and locate them quickly",
  },
];

export function IoTSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 rounded-full">
            <span className="text-sm font-bold text-orange-700 dark:text-orange-300">IoT & CONNECTED PRODUCTS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            Unlocking Real‑World Intelligence
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4 leading-relaxed">
            Building Intelligence into the Physical World
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            At Ingress Software we believe the future is physical and digital—together. Our Internet‑of‑Things (IoT) and connected‑product team integrates sensors, controllers and cloud intelligence to turn equipment, buildings and infrastructure into smart, self‑aware systems. From solar power plants to manufacturing floors and rental kiosks, we build digital threads that provide real‑time insight, predictive maintenance and automated decision‑making.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Engineers Specialize In
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <capability.icon className="w-12 h-12 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {capability.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Real Results for Real Clients
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Below are examples of how we&apos;ve used these capabilities to deliver tangible results for our clients.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${study.gradient} rounded-t-2xl`}></div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${study.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <study.icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h4 className="text-2xl md:text-3xl font-black mb-2 text-gray-900 dark:text-white">
                        {study.title}
                      </h4>
                      <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                        {study.subtitle}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Challenge:</p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Solution:</p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{study.solution}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</p>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {study.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                              <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Outcome:</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 bg-gradient-to-br from-orange-50 via-blue-50 to-cyan-50 dark:from-gray-800 dark:via-blue-900 dark:to-orange-900 rounded-2xl p-10 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Operational & Economic Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <benefit.icon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" strokeWidth={2} />
                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These benefits demonstrate how bridging the physical and digital worlds through IoT provides the visibility needed to control and protect critical assets. Our team builds solutions that work with any sensor, communication protocol or application—delivering unified data and consistent alerts instead of disjointed systems.
          </p>
        </div>

        {/* Why Choose Ingress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-12 border border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Why Choose Ingress for Your Connected Product Journey?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-center leading-relaxed mb-8">
            Our approach combines deep technical expertise with a focus on business outcomes. Whether you need to monitor solar installations, track assets across campuses, enable contactless user experiences or build a secure data backend, we deliver solutions that are scalable, secure and tailored to your operations.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-8">
            Ingress Software will work with you to understand your environment, recommend the right mix of IoT hardware and software, and deliver a complete solution—from prototype to production—that accelerates your digital transformation.
          </p>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
            >
              Ready to Make Your Products Smarter?
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
