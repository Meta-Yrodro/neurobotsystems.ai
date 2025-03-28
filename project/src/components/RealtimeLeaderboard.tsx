import React, { useState, useEffect } from 'react';
import { Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface LeaderboardEntry {
  user_email: string;
  current_rank: number;
  total_points: number;
  last_action: string;
  rank_change_direction: string;
}

export default function RealtimeLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchLeaderboard();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('realtime_leaderboard')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'realtime_leaderboard'
      }, () => {
        fetchLeaderboard();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('realtime_leaderboard')
        .select('*')
        .order('current_rank', { ascending: true })
        .limit(10);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold">Live Rankings</h2>
        </div>
        <button
          onClick={fetchLeaderboard}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.user_email}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-bold">
              {entry.current_rank}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {entry.user_email.split('@')[0]}
                </span>
                <span className="text-sm text-gray-400">
                  {entry.rank_change_direction}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {entry.total_points} points
              </p>
            </div>

            <div className="text-sm text-gray-400">
              {entry.last_action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}