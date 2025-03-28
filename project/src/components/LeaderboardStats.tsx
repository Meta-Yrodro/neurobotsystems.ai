import React from 'react';
import { Trophy, Users, Star } from 'lucide-react';

interface LeaderboardEntry {
  user_email: string;
  activity_count: number;
  badge_count: number;
}

export default function LeaderboardStats() {
  // Demo data - replace with real data from Supabase
  const leaderboardData: LeaderboardEntry[] = [
    { user_email: 'sarah@example.com', activity_count: 15, badge_count: 3 },
    { user_email: 'mike@example.com', activity_count: 12, badge_count: 2 },
    { user_email: 'alex@example.com', activity_count: 10, badge_count: 2 },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold">This Week&apos;s Most Active Users</h3>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((entry, index) => (
          <div
            key={entry.user_email}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              {index + 1}
            </div>

            <div className="flex-1">
              <p className="font-medium">{entry.user_email.split('@')[0]}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {entry.activity_count} activities
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {entry.badge_count} badges
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}