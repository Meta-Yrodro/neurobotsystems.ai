import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Start() {
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
            <h1 className="text-5xl font-bold mb-8 glitch">
              Ready to Get Started?
            </h1>
            <p className="text-xl text-purple-400 max-w-2xl mx-auto mb-12">
              Let's automate your business and save you time.
            </p>
          </section>

          {/* Options Section */}
          <section className="max-w-2xl mx-auto">
            <div className="card p-8 text-center space-y-8">
              <p className="text-xl text-gray-300">
                You can either:
              </p>

              <div className="space-y-6">
                <Link 
                  to="/contact"
                  className="block w-full card bg-purple-900/20 p-6 hover:scale-105 transition-transform"
                >
                  <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Contact Us Directly</h3>
                  <p className="text-gray-400">Send us a message or book a call</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-purple-400">
                    Contact Page <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <div className="block w-full card bg-purple-900/20 p-6">
                  <MessageSquare className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Chat with Our AI Assistant</h3>
                  <p className="text-gray-400">Click the chatbot in the bottom right to get started instantly</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-purple-400">
                    <span>↘</span> Click the chat bubble
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}