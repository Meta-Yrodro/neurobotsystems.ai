import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Clock, Calendar } from 'lucide-react';

export default function Terms() {
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
              Terms of Service
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
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
              <h2 className="text-2xl font-bold mb-6 text-purple-400">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By using this website or our services, you agree to these terms. If you don't agree, do not use this site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">2. Services</h2>
              <p className="text-gray-300 mb-4">We offer AI automation services including:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>CRM Integration</li>
                <li>Appointment Systems</li>
                <li>Lead Generation</li>
                <li>AI Customer Support</li>
                <li>Website Automation</li>
              </ul>
              <p className="text-gray-300 mt-4">Details are customized for each client.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">3. User Obligations</h2>
              <p className="text-gray-300 mb-4">You agree not to misuse our site or tools. This includes:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>No reverse engineering</li>
                <li>No reselling of our code or systems</li>
                <li>No unlawful use of the platform</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">4. Intellectual Property</h2>
              <p className="text-gray-300">
                All content, branding, and software on this site belong to NeuroBotSystems.ai unless otherwise stated.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">5. Payments & Refunds</h2>
              <p className="text-gray-300">
                Custom packages are quoted individually. Payments are due based on contract agreements. 
                Refunds may be issued only if explicitly agreed upon in writing.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">6. Liability</h2>
              <p className="text-gray-300 mb-4">We do our best to deliver amazing systems. However, we are not liable for:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Business losses due to automation errors</li>
                <li>Downtime caused by 3rd-party platforms</li>
                <li>User misuse of our services</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">7. Modifications</h2>
              <p className="text-gray-300">
                We may update these terms at any time. We'll notify users via the site when significant changes are made.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">8. Contact</h2>
              <p className="text-gray-300">
                For questions or legal inquiries, email:{' '}
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