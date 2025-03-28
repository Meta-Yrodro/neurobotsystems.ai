import React, { useState, useEffect } from 'react';
import { Clock, Filter, Search } from 'lucide-react';
import { supabase, UserActivity } from '../utils/supabase';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// Demo activities for development/fallback
const DEMO_ACTIVITIES = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    user_email: 'demo@example.com',
    action: 'Form Submission',
    page: '/start',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user_email: 'demo@example.com',
    action: 'Chatbot Interaction',
    page: '/chatbot',
  },
];

interface ActivityLogProps {
  className?: string;
}

export default function ActivityLog({ className = '' }: ActivityLogProps) {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Check if we have valid Supabase credentials
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setActivities(DEMO_ACTIVITIES);
          setLoading(false);
          return;
        }

        const client = supabaseClient || supabase;
        if (!client) {
          throw new Error('Supabase client not initialized');
        }

        const { data, error } = await client
          .from('user_activities')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);

        if (error) {
          throw error;
        }

        setActivities(data || DEMO_ACTIVITIES);
      } catch (error) {
        console.error('Error fetching activities:', error);
        // Fallback to demo data on error
        setActivities(DEMO_ACTIVITIES);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [supabaseClient]);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.action.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              className="pl-10 pr-4 py-2 bg-black/50 border border-purple-500/20 rounded text-sm focus:border-purple-500 transition-colors"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-black/50 border border-purple-500/20 rounded px-4 py-2 text-sm focus:border-purple-500 transition-colors"
          >
            <option value="all">All Activities</option>
            <option value="form">Form Submissions</option>
            <option value="chatbot">Chatbot Interactions</option>
            <option value="cta">CTA Clicks</option>
            <option value="login">Logins</option>
            <option value="audit">Saved Audits</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-purple-500/20">
              <th className="pb-4 font-bold">Timestamp</th>
              <th className="pb-4 font-bold">User</th>
              <th className="pb-4 font-bold">Action</th>
              <th className="pb-4 font-bold">Page</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  Loading activities...
                </td>
              </tr>
            ) : filteredActivities.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  No activities found
                </td>
              </tr>
            ) : (
              filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-purple-500/5">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4">{activity.user_email}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                      {activity.action}
                    </span>
                  </td>
                  <td className="py-4">{activity.page}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}