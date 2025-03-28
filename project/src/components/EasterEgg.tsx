import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Download, Play } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface EasterEggProps {
  type: 'pdf' | 'video';
  title: string;
  url: string;
  onClose: () => void;
}

export default function EasterEgg({ type, title, url, onClose }: EasterEggProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    // Show with a slight delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
      playSound('glitch');
    }, 500);

    return () => clearTimeout(timer);
  }, [playSound]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="card max-w-md w-full relative overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />

            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center"
              >
                <Gift className="w-8 h-8 text-purple-500" />
              </motion.div>

              <h3 className="text-2xl font-bold text-center mb-2">
                ⚡ You've Unlocked a Secret!
              </h3>

              <p className="text-purple-400 text-center mb-6">
                {title}
              </p>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button w-full flex items-center justify-center gap-2"
                onClick={() => playSound('transition')}
              >
                {type === 'pdf' ? (
                  <>
                    <Download className="w-5 h-5" />
                    Download Now
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Watch Now
                  </>
                )}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}