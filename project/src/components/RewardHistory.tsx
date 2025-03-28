import React from 'react';
import { Calendar, Download, Gift, Search } from 'lucide-react';

interface RewardHistoryEntry {
  id: string;
  date: string;
  rewardName: string;
  pointsUsed: number;
  status: 'active' | 'completed' | 'expired';
  downloadUrl?: string;
}

interface RewardHistoryProps {
  entries: RewardHistoryEntry[];
}

export default function RewardHistory({ entries }: RewardHistoryProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Rewards History</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search rewards..."
            className="pl-10 pr-4 py-2 bg-black/50 border border-purple-500/20 rounded text-sm focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No rewards claimed yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-purple-500/20">
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Reward</th>
                <th className="pb-4 font-bold">Points</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-purple-500/5">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {entry.date}
                    </div>
                  </td>
                  <td className="py-4">{entry.rewardName}</td>
                  <td className="py-4">{entry.pointsUsed}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      entry.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : entry.status === 'completed'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-4">
                    {entry.downloadUrl && (
                      <a
                        href={entry.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}