import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} id="about" className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className={`flex items-center gap-4 mb-8 transition-all duration-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Bot className="w-12 h-12 text-purple-500" />
          <h2 className="text-4xl font-bold glitch">About NeuroBotSystems.ai</h2>
        </div>
        
        <p className={`text-2xl text-purple-400 mb-8 transition-all duration-500 delay-100 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          We're not just coders. We're automation architects.
        </p>
        
        <p className={`text-xl text-gray-300 mb-8 transition-all duration-500 delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          We help businesses eliminate friction, close more deals, and reclaim time using next-gen AI systems.
        </p>
        
        <p className={`text-xl text-gray-300 mb-12 transition-all duration-500 delay-300 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Whether you need smarter CRMs, AI bots, or hands-free lead generation — we deliver custom-built, 
          scalable systems that feel like magic.
        </p>
        
        <div className={`card p-8 mb-12 transition-all duration-500 delay-400 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-2xl font-bold text-center text-purple-400">
            "We build the systems. You focus on the vision."
          </p>
        </div>
        
        <div className={`text-center transition-all duration-500 delay-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link 
            to="/start" 
            className="neon-button inline-flex items-center gap-2 text-lg group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}