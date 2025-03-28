import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Bot, Gift, Timer } from 'lucide-react';

const VARIANTS = [
  {
    type: 'urgent',
    icon: Timer,
    title: '⚠️ Last Chance!',
    subtitle: 'Time-Sensitive Offer Inside',
    message: 'Claim your FREE automation audit ($500 value) — Offer expires at midnight!',
    cta: '> Claim My Free Audit Now',
    iconColor: 'text-yellow-500'
  },
  {
    type: 'friendly',
    icon: Bot,
    title: 'Hey there! 👋',
    subtitle: 'Before you head out...',
    message: "We'd love to show you how AI can transform your business. Let's connect!",
    cta: '> Book a Free Strategy Call',
    iconColor: 'text-purple-500'
  },
  {
    type: 'playful',
    icon: Gift,
    title: 'Wait a sec! 🎁',
    subtitle: "You're leaving empty-handed",
    message: 'Grab your free automation blueprint before you go! Our AI has a special gift for you.',
    cta: '> Get My Free Blueprint',
    iconColor: 'text-green-500'
  }
];

export const ExitIntent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    // Check if we've shown the popup before
    const shown = localStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let timer: number;
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 && // Only trigger when mouse moves to top of window
        !hasShown &&
        !isVisible
      ) {
        timer = window.setTimeout(() => {
          setIsVisible(true);
          setVariant(Math.floor(Math.random() * VARIANTS.length));
          localStorage.setItem('exitIntentShown', 'true');
        }, 500);
      }
    };

    // Only add on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown, isVisible]);

  if (!isVisible) return null;

  const currentVariant = VARIANTS[variant];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="relative bg-gray-900 border border-purple-500/20 rounded-lg p-8 max-w-lg w-full">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className={`flex items-center gap-3 mb-2 ${currentVariant.iconColor}`}>
          <currentVariant.icon className="w-8 h-8" />
          <h2 className="text-2xl font-bold">{currentVariant.title}</h2>
        </div>

        <p className="text-lg mb-2 text-gray-300">
          {currentVariant.subtitle}
        </p>

        <p className="text-xl mb-6 text-purple-400">
          {currentVariant.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              window.location.href = '/start';
              setIsVisible(false);
            }}
            className="neon-button flex-1 text-lg py-3 group"
          >
            {currentVariant.cta}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};