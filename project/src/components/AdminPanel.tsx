import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, FileText, Users, Trophy, MessageSquare, 
  BarChart2, Settings, Gift, Brain, Mail, Share2, 
  FileCode, Shield
} from 'lucide-react';

interface AdminRoute {
  path: string;
  label: string;
  icon: React.ElementType;
  category: 'main' | 'content' | 'tools' | 'settings';
}

const ADMIN_ROUTES: AdminRoute[] = [
  // Main Pages
  { path: '/', label: 'Home', icon: Home, category: 'main' },
  { path: '/learn', label: 'Learn More', icon: FileText, category: 'main' },
  { path: '/dashboard', label: 'Client Dashboard', icon: Users, category: 'main' },
  { path: '/points', label: 'Points & Rewards', icon: Trophy, category: 'main' },
  { path: '/chatbot', label: 'Chatbot Demo', icon: MessageSquare, category: 'main' },
  
  // Content Management
  { path: '/blog', label: 'Blog Manager', icon: FileText, category: 'content' },
  { path: '/hall-of-fame', label: 'Hall of Fame', icon: Trophy, category: 'content' },
  { path: '/rewards', label: 'Rewards History', icon: Gift, category: 'content' },
  
  // Tools & Analytics
  { path: '/analytics', label: 'Analytics', icon: BarChart2, category: 'tools' },
  { path: '/chatbot-admin', label: 'Chatbot Settings', icon: Brain, category: 'tools' },
  { path: '/contact-admin', label: 'Contact Forms', icon: Mail, category: 'tools' },
  { path: '/referrals', label: 'Referral Dashboard', icon: Share2, category: 'tools' },
  
  // Settings & Legal
  { path: '/terms', label: 'Terms & Privacy', icon: Shield, category: 'settings' },
  { path: '/admin/settings', label: 'Admin Settings', icon: Settings, category: 'settings' }
];

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const filteredRoutes = ADMIN_ROUTES.filter(route =>
    route.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedRoutes = filteredRoutes.reduce((acc, route) => {
    if (!acc[route.category]) {
      acc[route.category] = [];
    }
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, AdminRoute[]>);

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/20 p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <FileCode className="w-8 h-8 text-purple-500" />
        <span className="text-lg font-bold">Admin Controls</span>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages..."
          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-purple-500/20 rounded text-sm focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Navigation Groups */}
      {Object.entries(groupedRoutes).map(([category, routes]) => (
        <div key={category} className="mb-8">
          <h3 className="text-sm text-purple-400 uppercase mb-4">
            {category.replace('_', ' ')}
          </h3>
          <nav className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === route.path
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'hover:bg-purple-500/10 text-gray-400 hover:text-purple-400'
                }`}
              >
                <route.icon className="w-5 h-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}