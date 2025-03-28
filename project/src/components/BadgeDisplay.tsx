import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface Badge {
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  earnedDate?: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  className?: string;
}

export default function BadgeDisplay({ badges, className = '' }: BadgeDisplayProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`card p-6 text-center ${
            badge.isUnlocked ? 'border-purple-500/40' : 'opacity-50'
          }`}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl"
            animate={badge.isUnlocked ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {badge.isUnlocked ? (
              badge.icon
            ) : (
              <Lock className="w-6 h-6 text-gray-400" />
            )}
          </motion.div>

          <h3 className="text-lg font-bold mb-2">{badge.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{badge.description}</p>

          {badge.isUnlocked && badge.earnedDate && (
            <p className="text-xs text-purple-400">
              Earned {new Date(badge.earnedDate).toLocaleDateString()}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}