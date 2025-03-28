import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import UserAvatar from './UserAvatar';
import ReferralSection from './ReferralSection';

interface FameEntry {
  user_email: string;
  display_name: string;
  avatar_url: string;
  rank: number;
  total_points: number;
  badges_earned: number;
  featured_badge: string;
  featured_achievement: string;
}

export default function HallOfFame() {
  const [entries, setEntries] = useState<FameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    fetchEntries();
  }, [timeframe]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('hall_of_fame hf')
        .select(`
          *,
          user_profiles (display_name, avatar_url)
        `)
        .order('rank', { ascending: true })
        .limit(25);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching hall of fame:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold">Hall of Fame</h2>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as any)}
          className="bg-black/50 border border-purple-500/20 rounded px-4 py-2"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid gap-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.user_email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
          >
            <UserAvatar
              email={entry.user_email}
              name={entry.display_name}
              avatarUrl={entry.avatar_url}
              size="md"
              isTopThree={index < 3}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">
                  {entry.display_name || entry.user_email.split('@')[0]}
                </span>
                <span className="text-purple-400">
                  {entry.featured_badge}
                </span>
              </div>
              
              <div className="text-sm text-gray-400">
                <span>{entry.total_points} points</span>
                <span className="mx-2">•</span>
                <span>{entry.badges_earned} badges</span>
              </div>
              
              {entry.featured_achievement && (
                <p className="text-sm text-purple-400 mt-1">
                  🏆 {entry.featured_achievement}
                </p>
              )}
            </div>

            <div className="text-2xl font-bold">
              #{entry.rank}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Referral Section */}
      <div className="mt-12">
        <ReferralSection />
      </div>
    </div>
  );
}