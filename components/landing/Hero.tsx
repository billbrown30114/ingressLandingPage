"use client";

import Link from "next/link";
import { Sparkles, Rocket } from "lucide-react";
import { ChristmasAnimation } from "./ChristmasAnimation";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white py-24 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Main content - takes 2 columns */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 lg:inline-flex">
                <Sparkles className="w-4 h-4 text-orange-200" strokeWidth={2} />
                <span className="text-sm font-semibold text-orange-200">AI-POWERED SOLUTIONS</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent animate-fade-in">
                AI TRANSFORMS
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
                  YOUR BUSINESS
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl mb-4 font-bold text-orange-100">
                Intelligent Automation • Machine Learning • AI Integration
              </p>
              
              <p className="text-xl mb-10 text-blue-200 max-w-3xl lg:mx-0 mx-auto">
                We build cutting-edge AI systems that automate workflows, predict outcomes, and revolutionize how your business operates
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href="/schedule"
                  className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-blue-600 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" strokeWidth={2.5} />
                    Start Your AI Journey
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                </Link>
                
                <Link
                  href="/services"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Explore AI Solutions
                </Link>
              </div>
              
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl lg:mx-0 mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-black text-orange-300">10x</div>
                  <div className="text-sm text-blue-200 mt-2">Productivity Boost</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-300">24/7</div>
                  <div className="text-sm text-blue-200 mt-2">AI Automation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-cyan-300">100%</div>
                  <div className="text-sm text-blue-200 mt-2">Custom Built</div>
                </div>
              </div>
            </div>
            
            {/* Right column - Christmas animation */}
            <div className="lg:col-span-1 hidden lg:block flex items-center">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <ChristmasAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

