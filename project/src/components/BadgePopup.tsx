import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface BadgePopup {
  id: string;
  badge_name: string;
  seen: boolean;
}

export default function BadgePopup() {
  const [popups, setPopups] = useState<BadgePopup[]>([]);
  const [currentPopup, setCurrentPopup] = useState<BadgePopup | null>(null);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    fetchUnseenPopups();
  }, []);

  const fetchUnseenPopups = async () => {
    try {
      const { data, error } = await supabase
        .from('badge_popups')
        .select('*')
        .eq('seen', false)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setPopups(data);
        setCurrentPopup(data[0]);
        playSound('glitch');
      }
    } catch (error) {
      console.error('Error fetching badge popups:', error);
    }
  };

  const markAsSeen = async () => {
    if (!currentPopup) return;

    try {
      await supabase
        .from('badge_popups')
        .update({ seen: true })
        .eq('id', currentPopup.id);

      // Show next popup or close
      const nextPopups = popups.filter(p => p.id !== currentPopup.id);
      setPopups(nextPopups);
      setCurrentPopup(nextPopups[0] || null);
    } catch (error) {
      console.error('Error marking popup as seen:', error);
    }
  };

  return (
    <AnimatePresence>
      {currentPopup && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="card p-6 w-80">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center"
            >
              <Trophy className="w-6 h-6 text-purple-500" />
            </motion.div>

            <h3 className="text-xl font-bold text-center mb-2">
              New Badge Unlocked!
            </h3>
            
            <p className="text-purple-400 text-center mb-4">
              {currentPopup.badge_name}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={markAsSeen}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Dismiss
              </button>

              <button
                onClick={() => {
                  markAsSeen();
                  window.location.href = '/dashboard';
                }}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}