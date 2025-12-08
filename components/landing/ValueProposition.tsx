"use client";

import { Zap, Target, RefreshCw, Rocket } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Lightning-Fast AI",
    description: "AI systems that process millions of data points in seconds, delivering instant insights and decisions",
    stat: "10x Faster",
    gradient: "from-orange-400 to-orange-600",
    bgGradient: "from-orange-100 to-orange-200",
    bgDark: "from-orange-900 to-orange-800",
    textColor: "text-orange-700",
    textDark: "dark:text-orange-300",
  },
  {
    icon: Target,
    title: "Precision Intelligence",
    description: "Machine learning models with 99%+ accuracy, reducing errors and maximizing efficiency",
    stat: "99%+ Accuracy",
    gradient: "from-blue-400 to-blue-600",
    bgGradient: "from-blue-100 to-blue-200",
    bgDark: "from-blue-900 to-blue-800",
    textColor: "text-blue-700",
    textDark: "dark:text-blue-300",
  },
  {
    icon: RefreshCw,
    title: "Self-Learning Systems",
    description: "AI that continuously improves, adapting to your business needs without constant intervention",
    stat: "24/7 Learning",
    gradient: "from-cyan-400 to-cyan-600",
    bgGradient: "from-cyan-100 to-cyan-200",
    bgDark: "from-cyan-900 to-cyan-800",
    textColor: "text-cyan-700",
    textDark: "dark:text-cyan-300",
  },
];

export function ValueProposition() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-orange-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-orange-200 dark:border-orange-700">
            <span className="text-sm font-bold text-orange-700 dark:text-orange-300">WHY AI MATTERS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            AI That Delivers Results
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We don&apos;t just implement AI—we build intelligent systems that transform how you do business
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`}></div>
              
              <div className="relative z-10">
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <value.icon className="w-16 h-16 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" strokeWidth={1.5} />
                </div>
                
                <div className={`inline-block px-3 py-1 mb-4 bg-gradient-to-r ${value.bgGradient} dark:bg-gradient-to-r ${value.bgDark} rounded-full`}>
                  <span className={`text-sm font-bold ${value.textColor} ${value.textDark}`}>
                    {value.stat}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 rounded-2xl text-white font-bold text-lg shadow-2xl">
            <Rocket className="w-5 h-5" strokeWidth={2.5} />
            <span>Ready to Transform Your Business with AI?</span>
          </div>
        </div>
      </div>
    </section>
  );
}

