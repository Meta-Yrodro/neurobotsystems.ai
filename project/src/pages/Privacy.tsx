import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Clock, Calendar } from 'lucide-react';

export default function Privacy() {
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

        <article className="container mx-auto px-4 py-24 max-w-4xl">
          {/* Article Header */}
          <header className="mb-16">
            <h1 className="text-4xl font-bold mb-8 glitch">
              Privacy Policy
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: March 24, 2025</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">1. Introduction</h2>
              <p className="text-gray-300 mb-6">
                At NeuroBotSystems.ai, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">2. Data We Collect</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Contact details (email, name, phone)</li>
                <li>Company info (name, website)</li>
                <li>Analytics data (IP, browser type, pages visited)</li>
                <li>CRM data if you use our integrations (with consent)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>To contact you after form submissions</li>
                <li>To set up demos or consultations</li>
                <li>To improve our services and user experience</li>
                <li>For email communications (only with opt-in)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">4. Data Sharing</h2>
              <p className="text-gray-300 mb-4">We do not sell or rent your data.</p>
              <p className="text-gray-300">
                We may share info with trusted partners only to fulfill services (e.g., CRM integration).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">5. Your Rights</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Access your data</li>
                <li>Request corrections or deletion</li>
                <li>Opt-out of marketing emails</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">6. Security</h2>
              <p className="text-gray-300">
                We use secure platforms, encryption, and access restrictions to protect your data.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">7. Cookies</h2>
              <p className="text-gray-300">
                We use cookies to improve UX. You can choose to disable cookies via browser settings.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">8. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions, contact us at:{' '}
                <a href="mailto:neurobotsystems.ai@gmail.com" className="text-purple-400 hover:text-purple-300">
                  neurobotsystems.ai@gmail.com
                </a>
              </p>
            </section>
          </div>
        </article>

        <Footer />
      </div>
    </div>
  );
}