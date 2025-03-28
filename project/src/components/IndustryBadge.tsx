import React from 'react';
import { motion } from 'framer-motion';

interface IndustryBadgeProps {
  industry: string;
  name: string;
  icon: string;
  description: string;
  animationType: 'bounce' | 'glow' | 'pulse' | 'shine' | 'float';
}

const animations = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  glow: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  shine: {
    background: [
      'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  float: {
    y: [0, -5, 0],
    rotate: [-1, 1, -1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export default function IndustryBadge({ industry, name, icon, description, animationType }: IndustryBadgeProps) {
  return (
    <motion.div
      className="card p-6 text-center"
      whileHover={{ scale: 1.05 }}
      animate={animations[animationType]}
    >
      <motion.div
        className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center text-4xl"
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
      
      <div className="mt-4 text-purple-400 text-sm">
        {industry} Specialist
      </div>
    </motion.div>
  );
}