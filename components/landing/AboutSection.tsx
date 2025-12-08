"use client";

import Link from "next/link";
import { Brain, Bot, Zap, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 rounded-full">
                <span className="text-sm font-bold text-orange-700 dark:text-orange-300">AI INNOVATION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                AI-Powered Future Starts Here
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                We&apos;re not just developers—we&apos;re <span className="font-bold text-orange-600 dark:text-orange-400">AI architects</span> building intelligent systems that transform how your business operates.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                From predictive analytics to autonomous workflows, our AI solutions learn, adapt, and evolve. We combine cutting-edge machine learning with deep local market knowledge to deliver systems that don&apos;t just work—they <span className="font-bold">think</span>.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Brain className="w-4 h-4 text-orange-700 dark:text-orange-300" strokeWidth={2} />
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-300">Machine Learning</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Bot className="w-4 h-4 text-blue-700 dark:text-blue-300" strokeWidth={2} />
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">AI Automation</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <Zap className="w-4 h-4 text-cyan-700 dark:text-cyan-300" strokeWidth={2} />
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Real-Time AI</span>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Learn More About Our AI Expertise →
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-blue-600 rounded-3xl p-8 text-white">
                <div className="mb-4">
                  <Bot className="w-16 h-16 text-white/90" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black mb-4">AI That Works</h3>
                <ul className="space-y-3 text-orange-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span>Intelligent automation that learns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span>Predictive analytics & forecasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span>Custom AI agents & chatbots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span>Real-time decision making</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

