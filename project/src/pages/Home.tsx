import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useMouseGlow } from '../hooks/useMouseGlow';
import Navigation from '../components/Navigation';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { 
  Bot, 
  BrainCircuit, 
  Calendar, 
  MessageSquare, 
  Zap, 
  Database, 
  Clock, 
  ArrowRight, 
  XCircle,
  Rocket,
  Target,
  Star,
  Mail,
  Instagram,
  Twitter,
  Users,
  Activity,
  Timer
} from 'lucide-react';

function StatsSection() {
  const { ref, inView } = useScrollAnimation();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCount1(Math.floor(34 * progress));
        setCount2(Math.floor(19200 * progress));
        setCount3(Math.floor(3 * progress));

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="container mx-auto px-4 py-20 bg-gray-900/30 backdrop-blur-sm">
      <h2 className="text-4xl font-bold text-center mb-12 glitch fade-up">
        Real-Time Impact
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card text-center fade-up">
          <Activity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <div className="text-4xl font-bold text-purple-400 mb-2">{count1}</div>
          <p className="text-gray-400">Businesses Automated in 2025</p>
        </div>
        
        <div className="card text-center fade-up" style={{ transitionDelay: '200ms' }}>
          <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <div className="text-4xl font-bold text-purple-400 mb-2">{count2}+</div>
          <p className="text-gray-400">Support Tickets Resolved This Month</p>
        </div>
        
        <div className="card text-center fade-up" style={{ transitionDelay: '400ms' }}>
          <Timer className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <div className="text-4xl font-bold text-purple-400 mb-2">{count3}</div>
          <p className="text-gray-400">Spots Left This Week</p>
        </div>
      </div>
    </section>
  );
}
function MatrixBackground() {
  useEffect(() => {
    const container = document.querySelector('.matrix-background');
    if (!container) return;

    // Create matrix columns
    const columns = 50;
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${(100 / columns) * i}%`;
      column.style.animationDelay = `${Math.random() * 20}s`;
      container.appendChild(column);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div className="matrix-background" />;
}

function PulseLines() {
  useEffect(() => {
    const container = document.querySelector('.pulse-lines');
    if (!container) return;

    // Create pulse lines
    const lines = 5;
    for (let i = 0; i < lines; i++) {
      const line = document.createElement('div');
      line.className = 'pulse-line';
      line.style.top = `${(100 / (lines + 1)) * (i + 1)}%`;
      line.style.animationDelay = `${i * 0.5}s`;
      container.appendChild(line);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div className="pulse-lines absolute inset-0 overflow-hidden" />;
}

function ReactiveGrid() {
  const { mousePosition, isDesktop } = useMouseGlow();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const grid = document.querySelector('.reactive-grid');
    if (!grid) return;

    const updateGrid = () => {
      const x = (mousePosition.x / window.innerWidth) * 100;
      const y = (mousePosition.y / window.innerHeight) * 100;
      grid.style.setProperty('--mouse-x', `${x}%`);
      grid.style.setProperty('--mouse-y', `${y}%`);
    };

    updateGrid();
    setIsVisible(true);

    return () => setIsVisible(false);
  }, [mousePosition, isDesktop]);

  return (
    <div className={`reactive-grid ${isVisible ? 'active' : ''}`} />
  );
}

function TypewriterText({ text, delay = 100 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="terminal-cursor">
      {displayText}
    </span>
  );
}

function TestimonialSlider() {
  const testimonials = [
    {
      text: "We automated 80% of our customer service with NeuroBotSystems—our response time is now instant!",
      author: "Sarah Chen",
      company: "TechFlow Solutions"
    },
    {
      text: "We cut manual tasks by 60% and increased lead conversion by 30% within weeks!",
      author: "Michael Rodriguez",
      company: "Growth Dynamics"
    },
    {
      text: "The AI chatbot has transformed how we handle customer inquiries. Incredible ROI!",
      author: "David Park",
      company: "Innovation Labs"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 overflow-hidden">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`absolute w-full transition-all duration-500 ${
            index === currentIndex 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="flex items-center gap-2 justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-purple-500 fill-purple-500" />
            ))}
          </div>
          <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
          <p className="text-purple-500">
            {testimonial.author}, <span className="text-gray-500">{testimonial.company}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
      {/* Section IDs for navigation */}
      <div id="about" />
      <div id="contact" />
      <div id="start" />

      {/* Grid Background with Animation */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <MatrixBackground />
        <PulseLines />
        <ReactiveGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Headline */}
              <h1 className="text-7xl font-bold mb-8 glitch tracking-tight">
                Automate. Scale. Dominate.
              </h1>

              {/* Subheadline */}
              <div className="text-purple-400 text-xl mb-12 leading-relaxed">
                <TypewriterText 
                  text="AI-powered automation for CRM, customer support, lead generation, and appointment setting—so you can focus on growing your business."
                  delay={50}
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center gap-6 mb-16">
                <Link 
                  to="/start" 
                  className="neon-button group text-lg px-8 py-3 flex items-center gap-2"
                >
                  &gt; GET STARTED
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/learn" 
                  className="px-8 py-3 border-2 border-purple-500 text-purple-500 rounded hover:bg-purple-500/10 transition-all duration-300 text-lg flex items-center gap-2"
                >
                  &gt; LEARN MORE
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-6">TRUSTED INTEGRATIONS</p>
                <div className="flex justify-center items-center gap-12">
                  <div className="text-center group">
                    <Database className="w-8 h-8 text-purple-500 mb-2 mx-auto group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs text-gray-500">HubSpot</span>
                  </div>
                  <div className="text-center group">
                    <Zap className="w-8 h-8 text-purple-500 mb-2 mx-auto group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs text-gray-500">Salesforce</span>
                  </div>
                  <div className="text-center group">
                    <Clock className="w-8 h-8 text-purple-500 mb-2 mx-auto group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs text-gray-500">Zapier</span>
                  </div>
                  <div className="text-center group">
                    <BrainCircuit className="w-8 h-8 text-purple-500 mb-2 mx-auto group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs text-gray-500">Make.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Problem & Solution Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 glitch">
            Wasting Time on Manual Tasks? You're Losing Revenue.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              {[
                "Missed follow-ups mean lost sales.",
                "Overwhelmed with customer inquiries?",
                "Manually scheduling appointments is inefficient.",
                "Your website isn't converting visitors into customers."
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-4 text-gray-300">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
            
            <div className="card bg-purple-900/20 border-purple-500">
              <p className="text-xl">
                NeuroBotSystems automates your entire workflow—so you can focus on what truly matters: closing deals and growing your business.
              </p>
              <Link 
                to="/start" 
                className="neon-button mt-8 inline-block"
              >
                &gt; AUTOMATE NOW
              </Link>
            </div>
          </div>
        </section>

        {/* Service Breakdown */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 glitch">
            How NeuroBotSystems Supercharges Your Business
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <Rocket className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 terminal-cursor">CRM Integration</h3>
              <p className="text-gray-400">Seamlessly connect with HubSpot, Salesforce & other CRMs for full automation.</p>
            </div>
            <div className="card">
              <Bot className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 terminal-cursor">AI-Powered Customer Support</h3>
              <p className="text-gray-400">24/7 automated chatbots & ticketing systems to handle customer inquiries.</p>
            </div>
            <div className="card">
              <Calendar className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 terminal-cursor">Smart Appointment Scheduling</h3>
              <p className="text-gray-400">No more manual scheduling—AI handles your bookings & reminders.</p>
            </div>
            <div className="card">
              <Target className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 terminal-cursor">Lead Generation & Website Creation</h3>
              <p className="text-gray-400">Automated lead capture and high-converting websites to boost revenue.</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/start" className="neon-button text-lg">
              &gt; Book a Free Demo
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-20 bg-gray-900/50 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center mb-12 glitch">
            Trusted by Businesses Worldwide
          </h2>
          
          <TestimonialSlider />
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 glitch">
              Ready to Automate & Scale Your Business?
            </h2>
            
            <p className="text-purple-400 text-xl mb-12">
              You can either:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Link 
                to="/contact"
                className="card bg-purple-900/20 p-6 hover:scale-105 transition-transform"
              >
                <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Contact Us Directly</h3>
                <p className="text-gray-400">Send us a message or book a call</p>
              </Link>

              <div className="card bg-purple-900/20 p-6">
                <MessageSquare className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Chat with Our AI Assistant</h3>
                <p className="text-gray-400">Click the chatbot in the bottom right ↘</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-purple-500 font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-purple-400">About</Link></li>
                <li><Link to="/learn" className="hover:text-purple-400">Learn More</Link></li>
                <li><Link to="/blog" className="hover:text-purple-400">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-purple-500 font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <a href="mailto:neurobotsystems@gmail.com" className="flex items-center gap-2 hover:text-purple-400">
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </a>
                <a 
                  href="https://instagram.com/neurobotsystems.ai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-purple-400"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://x.com/neurobotsystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-purple-400"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-purple-500 font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-purple-400">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-purple-500 font-bold mb-4">Start Today</h3>
              <p className="text-gray-400 mb-4">Don't wait—start automating today.</p>
              <Link to="/start" className="neon-button inline-block">
                &gt; Get Started
              </Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 NeuroBot Systems. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;