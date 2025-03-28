import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User } from 'lucide-react';
import { sendLeadNotification } from '../utils/emailService';

interface FormData {
  name: string;
  email: string;
  message: string;
  type: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
  type: 'general'
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await sendLeadNotification({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        formType: 'contact'
      });
      
      // In production, send to your email service
      console.log('Contact form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isMobile) {
    return (
      <section id="contact" className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-4">
          <a 
            href="mailto:neurobotsystems.ai@gmail.com"
            className="neon-button flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 glitch text-center">Get in Touch</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="card space-y-6">
            <div>
              <label className="flex items-center gap-2 text-purple-400 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-purple-400 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-purple-400 mb-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors h-32"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-purple-400 mb-2">
                What do you need help with?
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors"
              >
                <option value="general">General Inquiry</option>
                <option value="crm">CRM Automation</option>
                <option value="support">AI Customer Support</option>
                <option value="leads">Lead Generation</option>
                <option value="appointments">Appointment Scheduling</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="neon-button w-full flex items-center justify-center gap-2 group"
            >
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <div className="card text-center p-8">
            <Mail className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
            <p className="text-gray-300">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}