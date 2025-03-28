import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Download, Play } from 'lucide-react';
import ConfettiEffect from './ConfettiEffect';

interface CelebrationModalProps {
  title: string;
  message: string;
  type: 'level_up' | 'badge_unlock' | 'completion';
  reward?: {
    type: 'video' | 'pdf';
    url: string;
  };
  onClose: () => void;
}

export default function CelebrationModal({ 
  title, 
  message, 
  type,
  reward,
  onClose 
}: CelebrationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ConfettiEffect trigger={true} />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
        
        <div className="relative p-8">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center"
          >
            <Trophy className="w-8 h-8 text-purple-500" />
          </motion.div>

          <h3 className="text-2xl font-bold text-center mb-2">
            {title}
          </h3>

          <p className="text-purple-400 text-center mb-6">
            {message}
          </p>

          {reward && (
            <a
              href={reward.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button w-full flex items-center justify-center gap-2"
            >
              {reward.type === 'pdf' ? (
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
          )}

          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-400 hover:text-white transition-colors"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}