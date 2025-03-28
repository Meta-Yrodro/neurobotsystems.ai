import React from 'react';
import { Play, Download, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnlockableContentProps {
  type: 'video' | 'pdf';
  title: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function UnlockableContent({ type, title, isUnlocked, onUnlock }: UnlockableContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-start gap-4">
        {type === 'video' ? (
          <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-purple-500" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center">
            <Download className="w-6 h-6 text-purple-500" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          
          {isUnlocked ? (
            <button
              onClick={onUnlock}
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              {type === 'video' ? 'Watch Now' : 'Download Now'}
              {type === 'video' ? <Play className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Complete onboarding to unlock</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}