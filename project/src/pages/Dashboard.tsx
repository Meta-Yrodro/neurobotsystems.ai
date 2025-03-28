import React, { useState } from 'react';
import { Bot, Users, Clock, Zap, Settings, Bell, BarChart3, Database, Activity } from 'lucide-react';
import Navigation from '../components/Navigation';
import ActivityLog from '../components/ActivityLog';

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-12">
        <Bot className="w-8 h-8 text-purple-500" />
        <span className="text-lg font-bold">Client Dashboard</span>
      </div>

      <nav className="space-y-2">
        {[
          { icon: BarChart3, label: 'Overview', active: true },
          { icon: Bot, label: 'Automations' },
          { icon: Database, label: 'Data' },
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

function MetricCard({ icon: Icon, label, value, trend }: any) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-purple-900/30 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-purple-500" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

export default function Dashboard() {
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
                <h1 className="text-4xl font-bold mb-2">Welcome back, Client</h1>
                <p className="text-gray-400">Here's your AI automation data</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MetricCard
                icon={Bot}
                label="Bot Status"
                value="✅ Online"
              />
              <MetricCard
                icon={Users}
                label="Leads Captured This Week"
                value="28"
              />
              <MetricCard
                icon={Clock}
                label="Next Scheduled Automation"
                value="09:45 AM"
              />
              <MetricCard
                icon={Zap}
                label="Last System Update"
                value="2 hours ago"
              />
            </div>

            {/* Activity Log */}
            <ActivityLog className="mb-12" />
          </main>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}