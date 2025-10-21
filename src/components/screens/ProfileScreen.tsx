import { ChevronRight, User, Globe, Languages, Shield, Bell, Heart, LogOut, History } from 'lucide-react';
import { demoUserProfile } from '../../lib/demo-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  // Score evolution data (last 7 days)
  const scoreData = [
    { day: 'Mon', score: 78 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 80 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 83 },
    { day: 'Sat', score: 87 },
    { day: 'Sun', score: 85 }
  ];

  const menuItems = [
    {
      id: 'history',
      label: 'Scan History',
      description: 'View all your scanned products',
      icon: History,
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]/10'
    },
    {
      id: 'favorites',
      label: 'Favorite Products',
      description: 'View your saved products',
      icon: Heart,
      color: 'text-[#EF4444]',
      bg: 'bg-[#EF4444]/10'
    },
    {
      id: 'settings',
      label: 'Settings & Preferences',
      description: 'Manage allergies, diet, and app settings',
      icon: Shield,
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white px-6 pt-10 pb-8">
          <h1 className="mb-6">Profile</h1>
          
          {/* User Info Card */}
          <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-2xl p-5 border border-[#22C55E]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center border-2 border-[#22C55E]/30">
                <User className="w-10 h-10 text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <h2>{demoUserProfile.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{demoUserProfile.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#22C55E]/20">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#22C55E]" />
                <div>
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="text-sm">{demoUserProfile.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#22C55E]" />
                <div>
                  <p className="text-xs text-muted-foreground">Language</p>
                  <p className="text-sm">{demoUserProfile.language}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 py-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p>{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">Your Stats</h3>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl mb-1">47</p>
                <p className="text-xs text-muted-foreground">Scans</p>
              </div>
              <div>
                <p className="text-2xl mb-1">85</p>
                <p className="text-xs text-muted-foreground">Health Score</p>
              </div>
              <div>
                <p className="text-2xl mb-1">12</p>
                <p className="text-xs text-muted-foreground">Favorites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score Evolution Chart - Clickable */}
        <div className="px-6 pb-6">
          <button
            onClick={() => onNavigate('stats')}
            className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <h3>Health Score</h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scoreData} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8"
                  style={{ fontSize: '11px' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  style={{ fontSize: '11px' }}
                  domain={[60, 100]}
                  width={35}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#22C55E" 
                  strokeWidth={3}
                  dot={{ fill: '#22C55E', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Tap to view detailed statistics
            </p>
          </button>
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-6">
          <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left text-[#EF4444]">
            <div className="flex items-center justify-center gap-2">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
