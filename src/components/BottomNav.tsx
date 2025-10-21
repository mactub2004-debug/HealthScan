import { Home, Search, ShoppingBag, User, ScanLine } from 'lucide-react';
import { useState } from 'react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const [scanAnimation, setScanAnimation] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'scan', label: 'Scan', icon: ScanLine, isCenter: true },
    { id: 'shopping-list', label: 'List', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleScanClick = () => {
    setScanAnimation(true);
    setTimeout(() => {
      onNavigate('camera');
      setTimeout(() => setScanAnimation(false), 300);
    }, 200);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          // Special styling for the center scan button
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={handleScanClick}
                className={`flex flex-col items-center justify-center gap-1.5 -mt-8 transition-all ${
                  scanAnimation ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-lg shadow-[#22C55E]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#22C55E]/40 hover:scale-105 active:scale-95 transition-all ${
                  scanAnimation ? 'animate-pulse' : ''
                }`}>
                  <Icon className="w-8 h-8 text-white stroke-[2.5]" />
                </div>
                <span className="text-xs text-[#22C55E]">{item.label}</span>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-[#22C55E] scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-6 h-6 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs transition-all ${isActive ? '' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
