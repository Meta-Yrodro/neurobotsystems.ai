import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FeedbackBarProps {
  userName: string;
  auditCount: number;
  leaderboardPosition?: number;
  nearLevelUp?: boolean;
}

export default function FeedbackBar({ userName, auditCount, leaderboardPosition, nearLevelUp }: FeedbackBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    // Show bar after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Rotate through different messages
    const messageTimer = setInterval(() => {
      const messages = [
        `Welcome back, ${userName}. You've saved ${auditCount} audit${auditCount !== 1 ? 's' : ''}.`,
        nearLevelUp ? "You're one step away from unlocking your next badge!" : null,
        leaderboardPosition ? `🔥 This week's automation leaderboard: You're #${leaderboardPosition}!` : null
      ].filter(Boolean);

      const nextMessage = messages[Math.floor(Math.random() * messages.length)];
      if (nextMessage) setCurrentMessage(nextMessage);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, [userName, auditCount, leaderboardPosition, nearLevelUp]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 bg-purple-900/90 backdrop-blur-sm border-b border-purple-500/20 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white"
          >
            {currentMessage}
          </motion.p>

          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}