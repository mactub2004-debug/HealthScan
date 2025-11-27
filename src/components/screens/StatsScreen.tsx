import { ChevronLeft, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { demoScanHistory } from '../../lib/demo-data';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatsScreenProps {
  onBack: () => void;
}

export function StatsScreen({ onBack }: StatsScreenProps) {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate score data based on time range
  const getScoreData = () => {
    if (timeRange === 'week') {
      return [
        { day: 'Mon', score: 78 },
        { day: 'Tue', score: 82 },
        { day: 'Wed', score: 80 },
        { day: 'Thu', score: 85 },
        { day: 'Fri', score: 83 },
        { day: 'Sat', score: 87 },
        { day: 'Sun', score: 85 }
      ];
    } else if (timeRange === 'month') {
      return [
        { day: 'Week 1', score: 75 },
        { day: 'Week 2', score: 80 },
        { day: 'Week 3', score: 83 },
        { day: 'Week 4', score: 85 }
      ];
    } else {
      return [
        { day: 'Jan', score: 70 },
        { day: 'Feb', score: 72 },
        { day: 'Mar', score: 75 },
        { day: 'Apr', score: 78 },
        { day: 'May', score: 80 },
        { day: 'Jun', score: 82 },
        { day: 'Jul', score: 84 },
        { day: 'Aug', score: 83 },
        { day: 'Sep', score: 85 },
        { day: 'Oct', score: 85 },
        { day: 'Nov', score: 86 },
        { day: 'Dec', score: 87 }
      ];
    }
  };

  const scoreData = getScoreData();

  // Favorite brands from scan history
  const brandCounts = demoScanHistory.reduce((acc, item) => {
    const brand = item.product.brand;
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([brand, count]) => ({ brand, count }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1>{t.stats.detailedStats}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t.stats.insights}
              </p>
            </div>
          </div>
        </div>

        {/* Health Score Chart */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            <h3>{t.stats.scoreEvolution}</h3>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 mb-4">
            <Badge
              variant={timeRange === 'week' ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${timeRange === 'week'
                ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]/90'
                : 'hover:border-[#22C55E]/50'
                }`}
              onClick={() => setTimeRange('week')}
            >
              {t.common.week}
            </Badge>
            <Badge
              variant={timeRange === 'month' ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${timeRange === 'month'
                ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]/90'
                : 'hover:border-[#22C55E]/50'
                }`}
              onClick={() => setTimeRange('month')}
            >
              {t.common.month}
            </Badge>
            <Badge
              variant={timeRange === 'year' ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${timeRange === 'year'
                ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]/90'
                : 'hover:border-[#22C55E]/50'
                }`}
              onClick={() => setTimeRange('year')}
            >
              {t.common.year}
            </Badge>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scoreData} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
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
                  dot={{ fill: '#22C55E', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-3">
              {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} {t.stats.trend}
            </p>
          </div>
        </div>

        {/* Top Brands Ranking */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#F97316]" />
            <h3>{t.stats.topBrands}</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="space-y-3">
              {favoriteBrands.map((item, index) => (
                <div key={item.brand} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${index === 0 ? 'bg-[#FFD700]/20 text-[#FFD700]' :
                    index === 1 ? 'bg-[#C0C0C0]/20 text-[#C0C0C0]' :
                      index === 2 ? 'bg-[#CD7F32]/20 text-[#CD7F32]' :
                        'bg-gray-100 text-gray-500'
                    }`}>
                    <span>#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.brand}</p>
                  </div>
                  <div className="text-muted-foreground">
                    {item.count} {item.count === 1 ? t.common.scan : t.common.scans}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">{t.stats.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#22C55E]">85</p>
              <p className="text-xs text-muted-foreground">{t.stats.currentScore}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#22C55E]">+7</p>
              <p className="text-xs text-muted-foreground">{t.common.thisWeek}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#3B82F6]">47</p>
              <p className="text-xs text-muted-foreground">{t.stats.totalScans}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#EF4444]">12</p>
              <p className="text-xs text-muted-foreground">{t.stats.favorites}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
