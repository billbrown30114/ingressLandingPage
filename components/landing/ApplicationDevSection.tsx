"use client";

// This component introduces the AI‑First Application Development section. It mirrors the
// structure and styling of the existing IoT section, providing a header, a
// capabilities grid, a set of case studies, a benefits overview and a call to
// action. The content focuses on simplifying, modernizing and automating
// business applications through an AI‑first lens.

import {
  Code,
  Layers,
  Activity,
  UserCheck,
  Database,
  Brain,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// Capabilities describe the core competencies offered for AI‑first
// application development. Each item includes an icon, title, description
// and gradient used for subtle hover effects.
const appCapabilities = [
  {
    icon: Code,
    title: "Intelligent Requirements & Design",
    description:
      "AI‑driven requirement gathering, legacy code analysis and automated scaffolding",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "Cloud‑Native Modernization",
    description:
      "Migrate monoliths to microservices and serverless architectures for agility",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Activity,
    title: "AI‑Driven Development & DevOps",
    description:
      "Automated coding, testing and deployment with generative co‑pilots and MLOps",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: UserCheck,
    title: "Adaptive User Experiences",
    description:
      "Personalized, context‑aware interfaces using predictive analytics and NLP",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Database,
    title: "Data & Model Lifecycle Management",
    description:
      "Real‑time data pipelines, governance and continuous model deployment",
    gradient: "from-indigo-500 to-blue-600",
  },
];

// Case studies illustrate real or hypothetical scenarios that showcase the
// benefits of AI‑first application development. They follow a similar
// structure to the IoT section: a challenge, the solution, a list of
// features and the outcome.
const appCaseStudies = [
  {
    title: "Legacy Modernization with AI",
    subtitle: "Transforming Monoliths",
    icon: Layers,
    gradient: "from-green-500 to-emerald-500",
    challenge:
      "Outdated monolithic systems slow innovation and hide critical business logic, making upgrades risky and expensive.",
    solution:
      "Using AI to analyze legacy code, extract requirements and generate modern microservice scaffolding while retaining business rules.",
    features: [
      "Automated code analysis and documentation",
      "AI‑generated architecture blueprints",
      "Incremental migration with zero downtime",
      "Built‑in compliance and security checks",
    ],
    outcome:
      "Reduced modernization effort by 70%, shortened release cycles from months to days, and positioned the platform for rapid innovation.",
  },
  {
    title: "AI‑Augmented Development Portal",
    subtitle: "Empowering Developer Efficiency",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    challenge:
      "Development teams spend too much time on boilerplate tasks, environment setup and manually coordinating work streams.",
    solution:
      "A self‑service portal with AI co‑pilots that recommend patterns, generate code, test scripts and manage environments.",
    features: [
      "Generative code and test generation",
      "Integrated environment provisioning",
      "Centralized asset discovery and reuse",
      "Analytics on developer productivity and quality",
    ],
    outcome:
      "Improved developer satisfaction, reduced onboarding time and accelerated delivery by 50% while maintaining high quality.",
  },
  {
    title: "Automated Business Workflow",
    subtitle: "Intelligent Process Orchestration",
    icon: Activity,
    gradient: "from-blue-500 to-cyan-500",
    challenge:
      "Manual processes (e.g., invoice processing or customer onboarding) lead to delays, errors and inconsistent customer experiences.",
    solution:
      "AI‑enabled workflows that classify documents, extract data, apply business rules and trigger actions without human intervention.",
    features: [
      "Document classification and data extraction",
      "Machine learning based decisioning",
      "Integration with ERP/CRM systems",
      "Human‑in‑the‑loop review and exception handling",
    ],
    outcome:
      "Cut processing times by 80%, lowered operational costs and delivered consistently personalized customer experiences.",
  },
];

// Benefits highlight the tangible advantages of adopting an AI‑first approach
// to application development. These points map to the broader business
// outcomes clients can expect.
const appBenefits = [
  {
    icon: Activity,
    title: "Accelerate Time‑to‑Market",
    description: "AI co‑pilots and automation slash delivery cycles from months to days",
  },
  {
    icon: Brain,
    title: "Amplify Innovation",
    description: "Free teams to focus on creative problem‑solving by removing manual overhead",
  },
  {
    icon: Database,
    title: "Optimize Costs & Quality",
    description: "Automation reduces errors and maintenance while optimizing resource use",
  },
  {
    icon: UserCheck,
    title: "Personalize Experiences",
    description: "Deliver dynamic, context‑aware interfaces that delight users",
  },
];

// The main component renders the section. It uses Tailwind CSS classes
// consistent with the existing design to ensure a cohesive look across
// the landing page.
export function ApplicationDevSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full">
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
              AI‑FIRST APPLICATION DEVELOPMENT
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
            Simplify, Modernize & Automate
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4 leading-relaxed">
            Empowering AI‑First Business Applications
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We design and build modern applications with intelligence baked in from the start. From assessing legacy code to deploying adaptive interfaces, our AI‑first approach transforms development, accelerates delivery and unlocks new possibilities.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Capabilities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {appCapabilities.map((capability, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <capability.icon className="w-12 h-12 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" strokeWidth={1.5} />
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
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              AI in Action
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how our AI‑first approach delivers measurable results for clients across industries.
            </p>
          </div>
          <div className="space-y-12">
            {appCaseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${study.gradient} rounded-t-2xl`}></div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${study.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                    >
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
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Challenge:
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Solution:
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Key Features:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {study.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                              <span className="text-gray-600 dark:text-gray-400 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Outcome:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                          {study.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:via-blue-900 dark:to-purple-900 rounded-2xl p-10 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Why AI‑First?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {appBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <benefit.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" strokeWidth={2} />
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
            Adopting an AI‑first approach accelerates delivery, amplifies innovation
            and creates personalized experiences. We help you build the
            foundation today so you can adapt to tomorrow’s opportunities.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-12 border border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Ready to Transform Your Applications?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-center leading-relaxed mb-8">
            Our AI‑first methodology combines deep technical expertise with a
            relentless focus on business outcomes. Partner with us to
            reimagine your software and unlock new value.
          </p>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
            >
              Start Your AI Journey
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}