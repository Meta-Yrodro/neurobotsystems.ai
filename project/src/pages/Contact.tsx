import React, { useState } from 'react';
import { Mail, MessageSquare, Calendar, Instagram, Twitter, Bot } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Contact() {
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
              Let's Build Something Smart Together
            </h1>
            <p className="text-xl text-purple-400 max-w-2xl mx-auto">
              Reach out and let's talk automation.
            </p>
          </section>

          {/* Contact Options */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <a 
                href="mailto:neurobotsystems.ai@gmail.com"
                className="neon-button flex flex-col items-center justify-center p-6 h-full lg:col-span-2"
              >
                <Mail className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-400">neurobotsystems.ai@gmail.com</p>
              </a>

              <a 
                href="https://instagram.com/neurobotsystems.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button flex flex-col items-center justify-center p-6 h-full"
              >
                <Instagram className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Instagram</h3>
                <p className="text-gray-400">@neurobotsystems.ai</p>
              </a>

              <a 
                href="https://x.com/neurobotsystems"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button flex flex-col items-center justify-center p-6 h-full"
              >
                <Twitter className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Twitter/X</h3>
                <p className="text-gray-400">@neurobotsystems</p>
              </a>
            </div>
          </section>
          
          {/* Centered Chatbot Section */}
          <section className="max-w-md mx-auto mb-20">
            <div className="neon-button aspect-square flex flex-col items-center justify-center p-6">
              <MessageSquare className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Chatbot</h3>
              <p className="text-gray-400">Click the chat bubble ↘</p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-3xl mx-auto">
            <div className="card p-12 text-center">
              <Bot className="w-16 h-16 text-purple-500 mx-auto mb-8" />
              <blockquote className="text-2xl font-bold text-purple-400 mb-6">
                "Real AI doesn't replace people — it empowers them to move faster, smarter, and with zero friction."
              </blockquote>
              <p className="text-gray-400">— NeuroBotSystems.ai</p>
            </div>

          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}