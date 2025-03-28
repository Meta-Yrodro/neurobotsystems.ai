import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface LeaderboardEntry {
  user_email: string;
  total_score: number;
  last_action: string;
}

export default function WeeklyLeaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('weekly_leaderboard')
          .select('*')
          .order('total_score', { ascending: false })
          .limit(10);

        if (error) throw error;
        setLeaders(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="card p-6 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold">Weekly Champions</h2>
      </div>

      <div className="space-y-4">
        {leaders.map((entry, index) => (
          <motion.div
            key={entry.user_email}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              {index === 0 ? (
                <Medal className="w-6 h-6 text-yellow-500" />
              ) : index === 1 ? (
                <Medal className="w-6 h-6 text-gray-400" />
              ) : index === 2 ? (
                <Medal className="w-6 h-6 text-amber-600" />
              ) : (
                <Star className="w-6 h-6 text-purple-400" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-bold">
                {entry.user_email.split('@')[0]}
              </p>
              <p className="text-sm text-gray-400">
                {entry.total_score} points
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">
                Last active: {new Date(entry.last_action).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}