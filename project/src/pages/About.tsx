import React from 'react';
import { Bot, Brain, Rocket, Users, Settings, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />

        <main className="container mx-auto px-4 py-24">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Brain className="w-16 h-16 text-purple-500" />
              <h1 className="text-5xl font-bold glitch">The Story Behind NeuroBotSystems</h1>
            </div>
            
            <p className="text-xl text-purple-400 max-w-2xl mx-auto mb-12">
              We're not just coders. We're automation architects.
            </p>
          </section>

          {/* Mission Section */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="card p-8 mb-12">
              <p className="text-xl text-gray-300 leading-relaxed">
                We help businesses eliminate friction, close more deals, and reclaim their time using AI systems that feel like magic.
                Whether it's smarter CRMs, customer support bots, or automatic lead capture — we make it happen.
              </p>
            </div>
          </section>

          {/* Founder Section */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="card p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Bot className="w-12 h-12 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Meet Paul</h2>
                  <p className="text-purple-400">Founder & Automation Architect</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                An automation-obsessed builder who believes businesses should work smarter, not harder.
                After years of building, testing, and helping others grow, I knew it was time to launch
                NeuroBotSystems to share these tools with the world.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 glitch">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6">
                <Settings className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Efficiency over complexity</h3>
                <p className="text-gray-400">Simple solutions that deliver powerful results.</p>
              </div>
              
              <div className="card p-6">
                <Brain className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Simplicity powered by AI</h3>
                <p className="text-gray-400">Complex technology, simple interfaces.</p>
              </div>
              
              <div className="card p-6">
                <Rocket className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Build once, scale forever</h3>
                <p className="text-gray-400">Systems that grow with your business.</p>
              </div>
              
              <div className="card p-6">
                <Users className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Automation serves people</h3>
                <p className="text-gray-400">Enhancing human potential, not replacing it.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Link 
              to="/start"
              className="neon-button text-xl inline-flex items-center gap-2 group"
            >
              Start Your Automation Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}