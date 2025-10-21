import { Scan, Sparkles, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { demoProducts, demoUserProfile } from '../../lib/demo-data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const recommendedProducts = [
    demoProducts[0], // Suitable
    demoProducts[1], // Questionable
    demoProducts[3], // Suitable
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'suitable':
        return {
          label: 'Suitable',
          color: 'text-[#22C55E]',
          bg: 'bg-[#22C55E]',
          lightBg: 'bg-[#22C55E]/10'
        };
      case 'questionable':
        return {
          label: 'Questionable',
          color: 'text-[#F97316]',
          bg: 'bg-[#F97316]',
          lightBg: 'bg-[#F97316]/10'
        };
      case 'not-recommended':
        return {
          label: 'Not Recommended',
          color: 'text-[#EF4444]',
          bg: 'bg-[#EF4444]',
          lightBg: 'bg-[#EF4444]/10'
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-500',
          bg: 'bg-gray-500',
          lightBg: 'bg-gray-500/10'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header - Greeting */}
        <div className="px-6 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">Hello, Alex! 👋</h1>
              <p className="text-sm text-muted-foreground">Ready to make healthy choices?</p>
            </div>
            <button 
              onClick={() => onNavigate('profile')}
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-7">
          <div className="grid grid-cols-2 gap-3">
            {/* Products Scanned */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-[#22C55E] rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm">
                <Scan className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="mb-1">47</p>
                <p className="text-xs text-muted-foreground leading-tight">Products Scanned</p>
              </div>
            </div>

            {/* Health Score */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-[#F97316] rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="mb-1">85</p>
                <p className="text-xs text-muted-foreground leading-tight">Health Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-7">
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Smart Picks */}
            <button 
              onClick={() => onNavigate('recommendations')}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#F97316]/10 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <Sparkles className="w-8 h-8 text-[#F97316]" />
              </div>
              <p>Smart Picks</p>
              <p className="text-xs text-muted-foreground mt-1">For you</p>
            </button>

            {/* Community */}
            <button 
              onClick={() => onNavigate('search')}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <Users className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <p>Community</p>
              <p className="text-xs text-muted-foreground mt-1">Top rated</p>
            </button>
          </div>
        </div>

        {/* Recommended for You */}
        <div className="pb-6">
          <div className="flex items-center justify-between mb-4 px-6">
            <h3>Recommended for You</h3>
            <button 
              onClick={() => onNavigate('recommendations')}
              className="text-sm text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
            >
              See all
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 px-6 scrollbar-hide">
            {recommendedProducts.map((product) => {
              const statusConfig = getStatusConfig(product.status);
              return (
                <div 
                  key={product.id}
                  onClick={() => onNavigate('scan-result', { product })}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-40">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full ${statusConfig.lightBg} backdrop-blur-sm`}>
                      <span className={`text-xs ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h4 className="line-clamp-2 mb-1">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{product.category}</p>
                    
                    {/* Score Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#22C55E] rounded-full transition-all"
                          style={{ width: `${product.nutritionScore}%` }}
                        />
                      </div>
                      <span className="text-xs min-w-[2rem] text-right">{product.nutritionScore}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Tip */}
        <div className="px-6 pb-8">
          <div className="bg-[#FEF3E2] rounded-2xl p-5 border border-[#F97316]/20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F97316]/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Lightbulb className="w-7 h-7 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <p className="mb-2">Daily Tip</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reading nutrition labels? Focus on serving sizes first to accurately calculate your intake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
