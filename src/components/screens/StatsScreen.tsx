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
        { day: t.common.days.mon, score: 78 },
        { day: t.common.days.tue, score: 82 },
        { day: t.common.days.wed, score: 80 },
        { day: t.common.days.thu, score: 85 },
        { day: t.common.days.fri, score: 83 },
        { day: t.common.days.sat, score: 87 },
        { day: t.common.days.sun, score: 85 }
      ];
    } else if (timeRange === 'month') {
      return [
        { day: `${t.common.weekLabel} 1`, score: 75 },
        { day: `${t.common.weekLabel} 2`, score: 80 },
        { day: `${t.common.weekLabel} 3`, score: 83 },
        { day: `${t.common.weekLabel} 4`, score: 85 }
      ];
    } else {
      return [
        { day: t.common.months.jan, score: 70 },
        { day: t.common.months.feb, score: 72 },
        { day: t.common.months.mar, score: 75 },
        { day: t.common.months.apr, score: 78 },
        { day: t.common.months.may, score: 80 },
        { day: t.common.months.jun, score: 82 },
        { day: t.common.months.jul, score: 84 },
        { day: t.common.months.aug, score: 83 },
        { day: t.common.months.sep, score: 85 },
        { day: t.common.months.oct, score: 85 },
        { day: t.common.months.nov, score: 86 },
        { day: t.common.months.dec, score: 87 }
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
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors -ml-2"
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
                  cursor={{ stroke: '#22C55E', strokeWidth: 1, strokeDasharray: '3 3' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-100 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
                          <p className="text-xs text-muted-foreground mb-1">{label}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                            <p className="text-lg font-bold text-[#22C55E]">
                              {payload[0].value}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
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
              {timeRange === 'week' ? t.stats.weeklyOverview : timeRange === 'month' ? t.stats.trend : t.stats.trend}
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
