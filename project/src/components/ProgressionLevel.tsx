import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  description: string;
  xpRequired: number;
  completed: boolean;
  locked: boolean;
}

interface ProgressionLevelProps {
  currentLevel: number;
  xpPoints: number;
  levels: Level[];
}

export default function ProgressionLevel({ currentLevel, xpPoints, levels }: ProgressionLevelProps) {
  const nextLevel = levels.find(level => !level.completed);
  const progress = nextLevel 
    ? (xpPoints / nextLevel.xpRequired) * 100 
    : 100;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Your Progress</h3>
        <div className="text-purple-400">
          Level {currentLevel}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* Level Road Map */}
      <div className="space-y-6">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
              level.completed
                ? 'bg-purple-500/20'
                : level.locked
                ? 'bg-gray-800/50 opacity-50'
                : 'bg-gray-800/20'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              {level.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : level.locked ? (
                <Lock className="w-5 h-5 text-gray-500" />
              ) : (
                <span className="text-purple-400">{level.id}</span>
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-bold">{level.name}</h4>
              <p className="text-sm text-gray-400">{level.description}</p>
            </div>

            {level.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500 text-sm"
              >
                Completed!
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}