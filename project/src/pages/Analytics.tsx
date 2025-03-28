import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  BarChart3,
  Users,
  MousePointer,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Laptop,
  Bot,
  LineChart,
  Activity,
  Settings,
  Database
} from 'lucide-react';

function MetricCard({ icon: Icon, label, value, trend, trendValue }: any) {
  const isPositive = trend === 'up';
  
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-purple-900/30 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-purple-500" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="text-sm">{trendValue}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-12">
        <BarChart3 className="w-8 h-8 text-purple-500" />
        <span className="text-lg font-bold">Analytics</span>
      </div>

      <nav className="space-y-2">
        {[
          { icon: Activity, label: 'Overview', active: true },
          { icon: Users, label: 'Visitors' },
          { icon: Bot, label: 'Automations' },
          { icon: LineChart, label: 'Conversions' },
          { icon: Database, label: 'Data Export' },
          { icon: Settings, label: 'Settings' }
        ].map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? 'bg-purple-500/20 text-purple-400'
                : 'hover:bg-purple-500/10 text-gray-400 hover:text-purple-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function Analytics() {
  const [visitorCount, setVisitorCount] = useState(245);
  const [ctaClicks, setCtaClicks] = useState(78);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
      setCtaClicks(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />

        <div className="pl-64"> {/* Sidebar offset */}
          <main className="container py-24 px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold mb-2">Site Analytics</h1>
                <p className="text-gray-400">Real-time visitor insights and performance metrics</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MetricCard
                icon={Users}
                label="This Week's Visitors"
                value={visitorCount}
                trend="up"
                trendValue="12"
              />
              <MetricCard
                icon={MousePointer}
                label="CTA Clicks"
                value={ctaClicks}
                trend="up"
                trendValue="8"
              />
              <MetricCard
                icon={Clock}
                label="Avg. Time on Site"
                value="4:32"
                trend="up"
                trendValue="15"
              />
              <MetricCard
                icon={Globe}
                label="Top Country"
                value="France"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Blog Performance */}
              <div className="lg:col-span-2 card">
                <h2 className="text-xl font-bold mb-6">Top Blog Posts</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "AI in 2025",
                      views: 42,
                      trend: "up"
                    },
                    {
                      title: "Automating Customer Support",
                      views: 38,
                      trend: "up"
                    },
                    {
                      title: "CRM Integration Guide",
                      views: 31,
                      trend: "down"
                    }
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-500/20 p-2 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-gray-300">{post.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{post.views} views</span>
                        {post.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Split */}
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Device Distribution</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-900/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-purple-500" />
                        <span>Mobile</span>
                      </div>
                      <span className="text-purple-400">70%</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-900/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Laptop className="w-5 h-5 text-purple-500" />
                        <span>Desktop</span>
                      </div>
                      <span className="text-purple-400">30%</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}