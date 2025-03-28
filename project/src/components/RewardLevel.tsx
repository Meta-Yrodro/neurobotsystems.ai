import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle } from 'lucide-react';

interface RewardLevelProps {
  level: number;
  name: string;
  description: string;
  isUnlocked: boolean;
  isActive: boolean;
  xpProgress: number;
  reward?: {
    type: 'pdf' | 'video';
    title: string;
    url: string;
  };
}

export default function RewardLevel({
  level,
  name,
  description,
  isUnlocked,
  isActive,
  xpProgress,
  reward
}: RewardLevelProps) {
  return (
    <div
      className={`card p-6 ${
        isActive ? 'border-purple-500' : isUnlocked ? 'border-green-500/20' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isUnlocked ? 'bg-green-500/20' : 'bg-gray-800'
        }`}>
          {isUnlocked ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Lock className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Level {level}</h3>
            <span className="text-purple-400">{name}</span>
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>

      {isActive && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-400">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(xpProgress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )}

      {isUnlocked && reward && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-purple-500/20 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="font-bold">Level Reward</span>
          </div>
          <p className="text-sm text-gray-400 mb-2">{reward.title}</p>
          <a
            href={reward.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
          >
            {reward.type === 'pdf' ? '📄' : '🎥'} Access Now
          </a>
        </motion.div>
      )}
    </div>
  );
}