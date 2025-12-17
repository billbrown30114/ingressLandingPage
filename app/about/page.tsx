import { Navbar } from "@/components/layout/Navbar";
import { Metadata } from "next";
import Link from "next/link";
import { Target, Rocket, Bot, TrendingUp, Zap, Factory, Hospital, ShoppingCart, Briefcase, Zap as Lightning, CheckCircle2, Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - AI-Powered Software Solutions",
  description: "Learn about Ingress Software LLC - Driving digital transformation through cutting-edge AI, IoT, and automation technology",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-orange-200">ABOUT INGRESS SOFTWARE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent">
              Behind the Scenes at Ingress Software
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Driving digital transformation through cutting-edge AI, IoT, and automation technology
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                To make your business <span className="font-bold text-orange-600 dark:text-orange-400">smarter</span>, <span className="font-bold text-blue-600 dark:text-blue-400">faster</span>, and <span className="font-bold text-orange-600 dark:text-orange-400">more efficient</span> through tailored AI-powered software solutions designed to solve your most pressing challenges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl p-8">
                <div className="mb-4">
                  <Target className="w-12 h-12 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">We Solve Real Problems</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our team of seasoned developers, designers, and AI strategists work with you to identify the best solutions, ensuring seamless integration of IoT, AI, and automation that delivers measurable results.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-8">
                <div className="mb-4">
                  <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Proven Ability to Deliver</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We pride ourselves on delivering reliable solutions <span className="font-bold">on time and within budget</span>. Clear communication, agile practices, and transparent project management from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-First Approach */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-blue-50 to-cyan-50 dark:from-gray-800 dark:via-blue-900 dark:to-orange-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-orange-200 dark:border-orange-700">
                <span className="text-sm font-bold text-orange-700 dark:text-orange-300">AI-FIRST STRATEGY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                Are You Prepared for the Digital Economy?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                The digital economy is increasingly driven by <span className="font-bold">AI-first strategies</span>, where artificial intelligence is at the core of innovation, decision-making, and customer engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
                <div className="mb-3">
                  <Bot className="w-8 h-8 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Intelligent Automation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automate processes and workflows with AI that learns and adapts to your business needs
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                <div className="mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Predictive Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Gain deeper insights from data with machine learning models that forecast trends and opportunities
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-cyan-200 dark:border-cyan-700">
                <div className="mb-3">
                  <Zap className="w-8 h-8 text-cyan-600 dark:text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Real-Time Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enhance decision-making with AI systems that process data instantly and deliver actionable insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Applications & Use Cases */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                AI Applications & Use Cases
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Real-world AI solutions that transform businesses across industries
              </p>
            </div>

            <div className="space-y-8">
              {/* Use Case 1 */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Factory className="w-12 h-12 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Manufacturing & Industrial AI
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Predictive Maintenance:</strong> AI models analyze sensor data from production equipment to predict failures before they occur, reducing downtime by up to 50% and extending equipment lifespan.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Quality Control Automation:</strong> Computer vision systems inspect products in real-time, identifying defects with 99%+ accuracy, far exceeding human capabilities.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Supply Chain Optimization:</strong> Machine learning algorithms optimize inventory levels, predict demand fluctuations, and automate procurement decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Hospital className="w-12 h-12 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Healthcare AI Solutions
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Patient Scheduling Intelligence:</strong> AI-powered systems optimize appointment scheduling, predict no-shows, and automatically reschedule to maximize provider utilization.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Diagnostic Assistance:</strong> Machine learning models analyze medical images and patient data to assist healthcare professionals in early disease detection.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>HIPAA-Compliant Automation:</strong> Secure AI systems automate patient record management, billing, and compliance reporting while maintaining strict privacy standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Case 3 */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="w-12 h-12 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Retail & E-Commerce AI
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Personalized Customer Experiences:</strong> AI algorithms analyze customer behavior to deliver personalized product recommendations, increasing conversion rates by 30-40%.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Inventory Management:</strong> Predictive models forecast demand across multiple locations, optimizing stock levels and reducing overstock costs.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Intelligent Chatbots:</strong> AI-powered customer service agents handle inquiries 24/7, resolve common issues instantly, and escalate complex problems to human agents.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Case 4 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💼</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Professional Services AI
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Client Relationship Management:</strong> AI systems analyze client interactions, predict churn risk, and recommend personalized engagement strategies.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Project Management Intelligence:</strong> Machine learning optimizes resource allocation, predicts project timelines, and identifies potential bottlenecks before they impact delivery.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Document Automation:</strong> AI-powered systems extract, analyze, and process documents automatically, reducing manual data entry by 80%+.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Case 5 */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-l-4 border-cyan-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Lightning className="w-12 h-12 text-cyan-600 dark:text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Energy & IoT Solutions
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Smart Energy Management:</strong> AI optimizes energy consumption in real-time, reducing costs by 20-30% while maintaining comfort and productivity.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>IoT Device Intelligence:</strong> Machine learning processes data from connected devices to optimize operations, predict maintenance needs, and automate responses.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Predictive Analytics:</strong> AI models analyze historical and real-time data to forecast energy demand, optimize grid operations, and prevent outages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                A Disruptive Approach
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Great technology starts with understanding your business goals
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-orange-200 dark:border-orange-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We believe that great technology should always start with a clear understanding of your business goals. Our team of seasoned developers, designers, and AI strategists work with you to identify the best solutions, ensuring seamless integration of <span className="font-bold text-orange-600 dark:text-orange-400">IoT</span>, <span className="font-bold text-blue-600 dark:text-blue-400">AI</span>, and <span className="font-bold text-orange-600 dark:text-orange-400">automation</span> that delivers measurable results.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                By focusing on both the big picture and the finer details, we ensure that your technology not only performs today but also sets you up for success tomorrow. <span className="font-bold">Let Ingress Software be your partner in innovation. Together, we can build the future of your business.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Strive For */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Your Dream. Our Mission.
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                We strive to deliver end-to-end solutions that go beyond development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <Target className="w-14 h-14 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Set and Meet Expectations
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Transparency and integrity in every project, ensuring we deliver exactly what you need
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Top Technical Talent
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access to world-class developers, AI specialists, and technical experts from around the globe
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <Sparkles className="w-14 h-14 text-orange-600 dark:text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Captivating Solutions
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Products that not only meet technical requirements but captivate your customers and drive growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Let&apos;s discuss how our AI-powered solutions can drive your digital transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <Rocket className="w-5 h-5" strokeWidth={2.5} />
                Schedule a Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
