import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="container py-fluid-12 border-t border-purple-500/20">
      <div className="grid-container grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ultrawide-grid mb-fluid-8">
        <div>
          <h3 className="text-purple-500 mb-fluid-4">Quick Links</h3>
          <ul className="space-y-fluid-2">
            <li>
              <Link to="/about" className="hover:text-purple-400">About</Link>
            </li>
            <li><Link to="/learn" className="hover:text-purple-400">Learn More</Link></li>
            <li><Link to="/blog" className="hover:text-purple-400">Blog</Link></li>
            <li>
              <Link to="/contact" className="hover:text-purple-400">Contact</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-purple-500 mb-fluid-4">Contact</h3>
          <div className="space-y-fluid-2">
            <a href="mailto:neurobotsystems.ai@gmail.com" className="neon-button flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
            <a 
              href="https://instagram.com/neurobotsystems.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="neon-button flex items-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://x.com/neurobotsystems" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="neon-button flex items-center gap-2 text-sm"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-purple-500 mb-fluid-4">Legal</h3>
          <ul className="space-y-fluid-2">
            <li><Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-purple-400">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-purple-500 mb-fluid-4">Start Today</h3>
          <p className="text-gray-400 mb-fluid-4">Don't wait—start automating today.</p>
          <Link 
            to="/start"
            className="neon-button inline-block"
          >
            &gt; Get Started
          </Link>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>© 2025 NeuroBot Systems. All Rights Reserved.</p>
      </div>
    </footer>
  );
}