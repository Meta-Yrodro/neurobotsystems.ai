import React from 'react';
import { Trophy, Download, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompletionBadgeProps {
  type: 'onboarding' | 'audit' | 'demo';
  onUnlock?: () => void;
}

export default function CompletionBadge({ type, onUnlock }: CompletionBadgeProps) {
  const badges = {
    onboarding: {
      title: 'Automation Explorer',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    audit: {
      title: 'System Starter',
      icon: Trophy,
      color: 'text-purple-500'
    },
    demo: {
      title: 'Bot Master',
      icon: Trophy,
      color: 'text-green-500'
    }
  };

  const badge = badges[type];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.8 }}
      className="card text-center p-8 max-w-md mx-auto"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 0.5 }}
        className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center ${badge.color}`}
      >
        <badge.icon className="w-10 h-10" />
      </motion.div>

      <h3 className="text-2xl font-bold mb-2">
        🏆 Congratulations!
      </h3>
      
      <p className="text-xl text-purple-400 mb-4">
        You&apos;ve earned the {badge.title} badge
      </p>

      <p className="text-gray-400 mb-8">
        You&apos;re now officially part of the NeuroBotSystems mission.
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={onUnlock}
          className="neon-button flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Watch Exclusive Video
        </button>

        <button
          onClick={onUnlock}
          className="border border-purple-500 text-purple-500 px-4 py-2 rounded hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF Guide
        </button>
      </div>
    </motion.div>
  );
}