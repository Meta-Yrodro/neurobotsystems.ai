import React from 'react';
import { Gift, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface RewardModalProps {
  reward: {
    name: string;
    points: number;
    description: string;
  };
  userPoints: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function RewardModal({ reward, userPoints, onConfirm, onClose }: RewardModalProps) {
  const { playSound } = useSoundEffects();
  const remainingPoints = userPoints - reward.points;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
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
              🎁 Confirm Your Reward Claim
            </h3>

            <div className="space-y-4 mb-8">
              <p className="text-center text-purple-400">
                You're about to redeem:
              </p>
              <div className="card bg-purple-900/20 p-4 text-center">
                <p className="text-xl font-bold mb-2">{reward.name}</p>
                <p className="text-sm text-gray-400">{reward.description}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cost:</span>
                <span className="text-purple-400">{reward.points} points</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Remaining Points:</span>
                <span className="text-purple-400">{remainingPoints}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  playSound('glitch');
                  onConfirm();
                }}
                className="flex-1 neon-button flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Confirm & Apply
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-600 text-gray-400 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}