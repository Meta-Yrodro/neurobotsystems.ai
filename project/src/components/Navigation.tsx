import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, Phone } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <header className={`mobile-nav ${visible ? 'visible' : 'hidden'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link to="/" className="text-purple-500 text-sm terminal-cursor hover:text-purple-400 transition-colors">
            &gt; NeuroBotSystems.ai
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-purple-500 hover:text-purple-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-fluid-4">
          <Link to="/blog" className="text-purple-500 hover:text-purple-400 transition-colors">&gt; BLOG</Link>
          <Link to="/learn" className="text-purple-500 hover:text-purple-400 transition-colors">&gt; LEARN MORE</Link>
          <Link to="/chatbot" className="text-purple-500 hover:text-purple-400 transition-colors">&gt; CHATBOT</Link>
          <Link 
            to="/start"
            className="neon-button"
          >
            &gt; START
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed top-[4rem] left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-purple-500/20 transition-all duration-300 z-50 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-fluid-4 p-fluid-4">
          <Link 
            to="/blog" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            &gt; BLOG
          </Link>
          <Link 
            to="/learn" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            &gt; LEARN MORE
          </Link>
          <Link 
            to="/chatbot" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            &gt; CHATBOT DEMO
          </Link>
          <Link 
            to="/about" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            &gt; ABOUT
          </Link>
          <Link 
            to="/contact" 
            className="text-purple-500 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            &gt; CONTACT
          </Link>
          <Link 
            to="/start"
            onClick={() => {
              setIsMenuOpen(false);
            }} 
            className="neon-button text-left"
          >
            &gt; START
          </Link>
        </div>
      </div>
    </header>

    {/* Mobile CTA Bar */}
    <div className="mobile-cta md:hidden">
      <a 
        href="tel:+1234567890" 
        className="neon-button py-2 px-4 flex items-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Call Us
      </a>
      <Link 
        to="/start"
        className="neon-button py-2 px-4"
      >
        Get Started
      </Link>
    </div>
    </>
  );
};

export default Navigation;