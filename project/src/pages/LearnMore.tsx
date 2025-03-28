import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Bot, 
  BrainCircuit, 
  Calendar,
  MessageSquare,
  Zap,
  Database,
  Clock,
  ArrowRight,
  CheckCircle2,
  Brain,
  Rocket,
  Target,
  Globe,
  Users,
  Sparkles,
  Code,
  PhoneCall
} from 'lucide-react';

function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  benefits, 
  result 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  result: string;
}) {
  const [displayTitle, setDisplayTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < title.length) {
          setDisplayTitle(prev => prev + title[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, title]);

  return (
    <div ref={cardRef} className="card mb-12 group service-card floating">
      <div className="flex items-start gap-6">
        <div className="bg-purple-900/30 p-4 rounded-lg group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8 text-purple-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-purple-400 terminal-cursor">
            {isVisible ? displayTitle : title}
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-gray-400 mb-4 text-lg">🔹 What we do:</p>
              <p className="text-gray-300">{description}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-4 text-lg">🔹 How it helps:</p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-purple-400 font-bold">Result: {result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearnMore() {
  const services = [
    {
      icon: Database,
      title: "1. CRM Integration",
      description: "We connect your sales, marketing, and customer databases into one seamless AI-powered ecosystem using platforms like HubSpot, Salesforce, or your existing CRM.",
      benefits: [
        "Never lose a lead again",
        "Auto-update client records",
        "Trigger personalized email/text sequences",
        "Full visibility over pipeline & conversion tracking"
      ],
      result: "Less manual work, more closed deals, better client retention."
    },
    {
      icon: Bot,
      title: "2. AI-Powered Customer Support",
      description: "We deploy advanced chatbots and ticket management systems that run 24/7, trained on your business FAQs and tone.",
      benefits: [
        "Instant replies to customers = Happier clients",
        "Reduces human support workload",
        "Handles multiple chats/tickets at once with zero delay",
        "Integrates with platforms like Zendesk, Intercom, or even email"
      ],
      result: "Clients feel heard, your team stays focused, and support runs non-stop—even while you sleep."
    },
    {
      icon: Calendar,
      title: "3. Smart Appointment Scheduling",
      description: "We build appointment bots that handle bookings, reschedules, reminders, and calendar syncing automatically.",
      benefits: [
        "No more back-and-forth emails",
        "Eliminates double bookings",
        "Fully synced with Google, Outlook, Calendly",
        "Automatic follow-ups if no-shows occur"
      ],
      result: "You save time and keep your calendar full of high-quality prospects."
    },
    {
      icon: Target,
      title: "4. Lead Generation Systems",
      description: "We create advanced lead capture systems—landing pages, funnels, quizzes, and bots—that qualify and tag leads instantly.",
      benefits: [
        "Filters out tire-kickers",
        "Builds segmented lists for marketing",
        "Auto-sends offers, PDFs, and emails based on user behavior",
        "Boosts inbound leads 24/7"
      ],
      result: "You wake up to qualified leads ready to buy. Every. Single. Day."
    },
    {
      icon: Globe,
      title: "5. Website Creation (Built for Conversion)",
      description: "We design lightning-fast, beautiful websites powered by AI—with built-in automation features and tracking.",
      benefits: [
        "Converts visitors into customers automatically",
        "Built with modern, responsive UI/UX",
        "Integrated with analytics + CRM + AI bots",
        "Designed to grow as your business grows"
      ],
      result: "A sleek, pro website that works for you like an elite 24/7 sales rep."
    }
  ];

  const targetAudience = [
    "Coaches & consultants",
    "Agencies & freelancers",
    "Service-based businesses",
    "Tech startups",
    "E-commerce brands"
  ];

  const whyChooseUs = [
    {
      icon: Sparkles,
      title: "Custom Solutions",
      description: "No templates. We build based on your unique business."
    },
    {
      icon: Code,
      title: "Done-For-You Setup",
      description: "You don't need to touch code or integrations."
    },
    {
      icon: Rocket,
      title: "Scale-Ready Systems",
      description: "Designed to grow as you grow."
    },
    {
      icon: Users,
      title: "Built by Humans. Powered by AI.",
      description: "We mix tech and strategy like no one else."
    }
  ];

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
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Brain className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl font-bold glitch">What We Do at NeuroBotSystems.ai</h1>
            </div>
            
            <p className="text-2xl text-center text-purple-400 mb-8">
              "Don't work harder. Automate smarter."
            </p>
            
            <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
              NeuroBotSystems is your behind-the-scenes AI powerhouse—designing automation systems that save time, scale operations, and unlock insane growth.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-4 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 glitch">Here's What We Do (In Simple Terms)</h2>
            <p className="text-xl text-gray-300 mb-8">
              We build custom AI automation systems that handle the boring, repetitive, time-wasting tasks in your business—so you and your team can focus on high-impact work.
            </p>
            <div className="flex items-center gap-4 text-xl text-purple-400">
              <span>🔧 You tell us what's slowing you down—</span>
              <span>⚡ We automate it with precision.</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-16 glitch text-center">Our Core Services (In Detail)</h2>
            
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-16 px-4 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 glitch text-center">Who This Is For</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {targetAudience.map((audience, index) => (
                <div key={index} className="card flex items-center gap-4 group">
                  <CheckCircle2 className="w-6 h-6 text-purple-500 group-hover:scale-125 transition-transform" />
                  <span className="text-lg">{audience}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-xl text-gray-300 mt-12">
              If you're tired of doing repetitive tasks and want to grow faster—this is for you.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-16 glitch text-center">Why Choose NeuroBotSystems.ai?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="card group">
                  <reason.icon className="w-12 h-12 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
                  <p className="text-gray-300">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default LearnMore;