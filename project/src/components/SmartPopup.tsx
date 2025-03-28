import React, { useState, useEffect } from 'react';
import { X, Bot, Timer, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

interface PopupProps {
  type: 'delay' | 'scroll' | 'mobile';
  onClose: () => void;
}

const POPUP_STORAGE_KEY = 'neurobot_popup_shown';

export const SmartPopup: React.FC<PopupProps> = ({ type, onClose }) => {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
  };

  const handleCTA = () => {
    trackEvent('popup_cta_click', { popup_type: type });
    window.location.href = '/start';
  };

  let title = '';
  let message = '';

  switch (type) {
    case 'delay':
      title = 'Still thinking?';
      message = "Let's plan your free audit and show you exactly how much time and money you can save.";
      break;
    case 'scroll':
      title = 'Ready to take action?';
      message = 'Book your free strategy call now and get a personalized automation roadmap.';
      break;
    case 'mobile':
      title = 'Tap for your free audit';
      message = '100% personalized automation strategy for your business.';
      break;
  }

  useEffect(() => {
    const hasShown = localStorage.getItem(POPUP_STORAGE_KEY);
    if (hasShown) return;

    let timeout: number;

    if (type === 'delay') {
      timeout = window.setTimeout(() => {
        setIsVisible(true);
        trackEvent('popup_shown', { popup_type: 'delay' });
      }, 15000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [type, trackEvent]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed z-50 animate-fade-in ${
        type === 'mobile' 
          ? 'bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-purple-500/20'
          : 'inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'
      }`}
    >
      <div 
        className={`relative ${
          type === 'mobile'
            ? 'w-full'
            : 'bg-gray-900 border border-purple-500/20 rounded-lg p-8 max-w-lg w-full'
        }`}
      >
        {type !== 'mobile' && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-4">
          {type === 'delay' ? (
            <Timer className="w-8 h-8 text-purple-500" />
          ) : (
            <Bot className="w-8 h-8 text-purple-500" />
          )}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleCTA}
            className="neon-button flex-1 py-3 flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          {type !== 'mobile' && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const useSmartPopups = () => {
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const hasShown = localStorage.getItem(POPUP_STORAGE_KEY);
    if (hasShown) return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 60 && !showScrollPopup) {
        setShowScrollPopup(true);
        trackEvent('popup_shown', { popup_type: 'scroll' });
      }
    };

    if (location.pathname.includes('/blog') || location.pathname.includes('/learn')) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location, showScrollPopup, trackEvent]);

  return {
    showScrollPopup,
    setShowScrollPopup
  };
};