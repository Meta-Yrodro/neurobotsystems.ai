import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  Bot,
  Activity,
  Users,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Home,
  Database,
  LineChart,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-12">
        <Bot className="w-8 h-8 text-purple-500" />
        <span className="text-lg font-bold">NeuroBot Portal</span>
      </div>

      <nav className="space-y-2">
        {[
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Bot, label: 'Automations' },
          { icon: Database, label: 'CRM Data' },
          { icon: LineChart, label: 'Analytics' },
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

function StatusSection() {
  const [dots, setDots] = useState('...');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="card bg-green-500/10 border-green-500/30">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-bold text-green-400">System Status: Online</h3>
            <p className="text-sm text-gray-400">All automations running smoothly</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center gap-4">
          <Bot className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-bold text-purple-400">AI Bot Active</h3>
            <p className="text-sm text-gray-400">Processing queries{dots}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientPortal() {
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
                <h1 className="text-4xl font-bold mb-2">Client Dashboard</h1>
                <p className="text-gray-400">Real-time automation metrics and performance</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </div>
            </div>

            <StatusSection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MetricCard
                icon={Users}
                label="Lead Captures Today"
                value="28"
                trend="up"
                trendValue="12"
              />
              <MetricCard
                icon={Activity}
                label="Active Conversations"
                value="14"
                trend="up"
                trendValue="8"
              />
              <MetricCard
                icon={DollarSign}
                label="Revenue Generated"
                value="$4,280"
                trend="up"
                trendValue="23"
              />
              <MetricCard
                icon={Clock}
                label="Avg. Response Time"
                value="1.2m"
                trend="down"
                trendValue="18"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Activity Feed */}
              <div className="lg:col-span-2 card">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Bot,
                      text: "AI Bot resolved customer inquiry",
                      time: "2 minutes ago",
                      status: "success"
                    },
                    {
                      icon: Users,
                      text: "New lead captured from website",
                      time: "15 minutes ago",
                      status: "success"
                    },
                    {
                      icon: Database,
                      text: "CRM data synchronized",
                      time: "1 hour ago",
                      status: "success"
                    },
                    {
                      icon: Clock,
                      text: "Appointment scheduled with lead",
                      time: "2 hours ago",
                      status: "success"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/30">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'success' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <item.icon className={`w-5 h-5 ${
                          item.status === 'success' ? 'text-green-500' : 'text-yellow-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{item.text}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Scheduled Tasks</h2>
                <div className="space-y-4">
                  {[
                    {
                      time: "09:45 AM",
                      task: "Email Campaign Launch",
                      status: "pending"
                    },
                    {
                      time: "11:30 AM",
                      task: "Lead Scoring Update",
                      status: "pending"
                    },
                    {
                      time: "02:15 PM",
                      task: "CRM Data Backup",
                      status: "pending"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/30">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.time}</p>
                        <p className="text-xs text-gray-400">{item.task}</p>
                      </div>
                    </div>
                  ))}
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

export default ClientPortal;