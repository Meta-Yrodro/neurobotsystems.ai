import React, { useState, useEffect } from 'react';
import { Bot, MessageSquare, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useAnalytics } from '../hooks/useAnalytics';

interface Message {
  text: string;
  isBot: boolean;
  links?: { text: string; url: string }[];
  options?: string[];
}

interface ChatDemo {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  messages: Message[];
}

const chatDemos: ChatDemo[] = [
  {
    id: 'faq',
    title: '🧠 Answer FAQs',
    icon: '🧠',
    subtitle: 'Instant responses to common questions',
    messages: [
      { text: "Hi! What kind of services do you offer?", isBot: false },
      { 
        text: "Hey there! 👋 We offer:\n• CRM Integration\n• Lead Generation\n• Appointment Automation\n• AI-Powered Customer Support\nWould you like help with one of those?",
        isBot: true 
      },
      { text: "How long does it take to get started?", isBot: false },
      { 
        text: "Most clients are onboarded in 48–72 hours 🚀\nWe move fast and tailor everything to your business needs.",
        isBot: true 
      }
    ]
  },
  {
    id: 'qualify',
    title: '🧲 Qualify Leads',
    icon: '🧲',
    subtitle: 'Smart filtering of potential clients',
    messages: [
      { text: "I'm interested in your automation services.", isBot: false },
      { 
        text: "Awesome! Let's find out what you need:\n1️⃣ How do you get leads?\n• A) Website\n• B) Socials\n• C) Word of mouth\n• D) Other",
        isBot: true 
      },
      { text: "A & B", isBot: false },
      { text: "Great. Do you use a CRM like HubSpot?", isBot: true },
      { text: "Yes, HubSpot.", isBot: false },
      { 
        text: "Perfect — we can automate capture, tagging, and follow-ups directly inside HubSpot 🔁\nWould you like a free custom audit?",
        isBot: true,
        links: [{ text: "📎 > Claim My Audit", url: "/start" }]
      }
    ]
  },
  {
    id: 'book',
    title: '📅 Book Meetings',
    icon: '📅',
    subtitle: 'Automated scheduling & follow-ups',
    messages: [
      { text: "Can I schedule a call?", isBot: false },
      { 
        text: "Of course! 📅 Pick a time:\n• Tuesday @ 11:00 AM\n• Wednesday @ 3:00 PM\n• Thursday @ 9:30 AM",
        isBot: true 
      },
      { text: "Wednesday at 3:00.", isBot: false },
      { 
        text: "Locked in! 🔒\nYou'll receive a calendar invite and a reminder 1 hour before your call.\n\n✅ Confirmation Sent",
        isBot: true,
        links: [{ text: "📎 > Add to Calendar", url: "https://calendly.com/neurobotsystems" }]
      }
    ]
  }
];

const ChatBubble = ({ isBot, children }: { isBot: boolean; children: React.ReactNode }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`max-w-[80%] p-4 rounded-lg ${
      isBot ? 'bg-purple-600/20' : 'bg-gray-800'
    } animate-fade-in whitespace-pre-wrap`}>
      {children}
    </div>
  </div>
);

export default function ChatbotDemo() {
  const { enabled } = useSoundEffects();
  const { trackEvent } = useAnalytics();
  const [activeDemo, setActiveDemo] = useState<string>('faq');
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const currentDemo = chatDemos.find(demo => demo.id === activeDemo)!;

  const playGlitchSound = () => {
    if (enabled) {
      const audio = new Audio('https://assets.mixkit.co/active/sfx/digital-glitch-short-39.wav');
      audio.volume = 0.15;
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    setVisibleMessages([]);
    const messages = currentDemo.messages;
    
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message]);
      }, index * 1000); // Show each message with a 1-second delay
    });
  }, [activeDemo, currentDemo.messages]);

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
              <Bot className="w-16 h-16 text-purple-500" />
              <h1 className="text-5xl font-bold glitch">Meet Your Future Support Agent</h1>
            </div>
            
            <p className="text-xl text-purple-400 max-w-2xl mx-auto mb-12">
              Our AI chatbots handle support, qualify leads, and book appointments 24/7—all while speaking in your brand's voice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "Answer FAQs",
                  description: "Instant responses to common questions"
                },
                {
                  icon: CheckCircle2,
                  title: "Qualify Leads",
                  description: "Smart filtering of potential clients"
                },
                {
                  icon: Bot,
                  title: "Book Meetings",
                  description: "Automated scheduling & follow-ups"
                }
              ].map((feature, index) => (
                <div key={index} className="card text-center">
                  <feature.icon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Chat Demo Section */}
          <section className="max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 glitch">See It In Action</h2>
            
            {/* Demo Type Selector */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              {chatDemos.map(demo => (
                <button
                  key={demo.id}
                  onClick={() => {
                    setActiveDemo(demo.id);
                    trackEvent('chatbot_demo_switch', {
                      demoType: demo.id,
                      previousDemo: activeDemo
                    });
                    playGlitchSound();
                  }}
                  className={`flex-1 card min-w-[200px] p-6 text-center transition-all duration-300 ${
                    activeDemo === demo.id 
                      ? 'border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]' 
                      : ''
                  }`}
                >
                  <div className="text-2xl mb-2">{demo.icon}</div>
                  <h3 className="font-bold mb-2">{demo.title}</h3>
                  <p className="text-sm text-gray-400">{demo.subtitle}</p>
                </button>
              ))}
            </div>
            
            <div className="card">
              <div className="border-b border-purple-500/20 p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-purple-500" />
                  <span className="font-bold">NeuroBot Assistant</span>
                  <span className="text-xs text-purple-400">Online</span>
                </div>
              </div>
              
              <div className="p-4 space-y-4 min-h-[400px] max-h-[400px] overflow-y-auto">
                {visibleMessages.map((message, index) => (
                  <ChatBubble key={index} isBot={message.isBot}>
                    {message.text}
                    {message.links && (
                      <div className="mt-4">
                        {message.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            className="block text-purple-400 hover:text-purple-300 mt-2"
                            onClick={playGlitchSound}
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </ChatBubble>
                ))}
              </div>
              
              {/* Test Bot Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    trackEvent('test_bot_click', { demoType: activeDemo });
                    window.location.href = '/start';
                  }}
                  className="neon-button inline-flex items-center gap-2 group animate-pulse hover:animate-none"
                >
                  🧪 Test This Bot Live
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Want This Bot For Your Business?</h2>
            <div className="flex justify-center gap-6">
              <a 
                href="/start" 
                className="neon-button flex items-center gap-2 group"
              >
                Claim Your Free Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 border-2 border-purple-500 text-purple-500 rounded hover:bg-purple-500/10 transition-all duration-300"
              >
                Talk to Us
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}