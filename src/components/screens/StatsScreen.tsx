import { ChevronLeft, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StorageService } from '../../lib/storage';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatsScreenProps {
  onBack: () => void;
}

export function StatsScreen({ onBack }: StatsScreenProps) {
  const { t, language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [history, setHistory] = useState(StorageService.getScanHistory());

  // Scroll to top on mount and load data
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh data in case it changed
    setHistory(StorageService.getScanHistory());
  }, []);

  // Calculate Summary Stats
  const totalScans = history.length;
  const favoritesCount = history.filter(item => item.isFavorite).length;

  // Current Score (Average of last 5 scans to be representative but current)
  const currentScore = useMemo(() => {
    if (history.length === 0) return 0;
    const recentItems = history.slice(0, 5);
    const sum = recentItems.reduce((acc, item) => acc + (item.product.nutritionScore || 0), 0);
    return Math.round(sum / recentItems.length);
  }, [history]);

  // Score Trend (Comparison with previous week/period)
  // Simplified: compare last 5 vs previous 5
  const scoreTrend = useMemo(() => {
    if (history.length < 10) return 0;
    const current = currentScore;
    const previousItems = history.slice(5, 10);
    const prevSum = previousItems.reduce((acc, item) => acc + (item.product.nutritionScore || 0), 0);
    const prevScore = Math.round(prevSum / previousItems.length);
    return current - prevScore;
  }, [history, currentScore]);

  // Generate Dynamic Score Data for Chart
  const scoreData = useMemo(() => {
    if (history.length === 0) return [];

    const now = new Date();
    const data: { day: string; score: number | null; count: number }[] = [];

    if (timeRange === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dayLabel = d.toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', { weekday: 'short' });

        const scansOfDay = history.filter(item => {
          const itemDate = new Date(item.scannedAt);
          return itemDate.getDate() === d.getDate() &&
            itemDate.getMonth() === d.getMonth() &&
            itemDate.getFullYear() === d.getFullYear();
        });

        if (scansOfDay.length > 0) {
          const avg = Math.round(scansOfDay.reduce((acc, item) => acc + (item.product.nutritionScore || 0), 0) / scansOfDay.length);
          data.push({ day: dayLabel, score: avg, count: scansOfDay.length });
        } else {
          data.push({ day: dayLabel, score: null, count: 0 });
        }
      }
    } else if (timeRange === 'month') {
      // Last 30 days - Daily view
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        // Show day number and month for context, e.g., "12 Oct"
        const dayLabel = d.toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short' });

        const scansOfDay = history.filter(item => {
          const itemDate = new Date(item.scannedAt);
          return itemDate.getDate() === d.getDate() &&
            itemDate.getMonth() === d.getMonth() &&
            itemDate.getFullYear() === d.getFullYear();
        });

        if (scansOfDay.length > 0) {
          const avg = Math.round(scansOfDay.reduce((acc, item) => acc + (item.product.nutritionScore || 0), 0) / scansOfDay.length);
          data.push({ day: dayLabel, score: avg, count: scansOfDay.length });
        } else {
          data.push({ day: dayLabel, score: null, count: 0 });
        }
      }
    } else {
      // Year view - Last 12 months (remains monthly average)
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now);
        d.setMonth(d.getMonth() - i);
        const monthLabel = d.toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', { month: 'short' });

        const scansOfMonth = history.filter(item => {
          const itemDate = new Date(item.scannedAt);
          return itemDate.getMonth() === d.getMonth() &&
            itemDate.getFullYear() === d.getFullYear();
        });

        if (scansOfMonth.length > 0) {
          const avg = Math.round(scansOfMonth.reduce((acc, item) => acc + (item.product.nutritionScore || 0), 0) / scansOfMonth.length);
          data.push({ day: monthLabel, score: avg, count: scansOfMonth.length });
        } else {
          data.push({ day: monthLabel, score: null, count: 0 });
        }
      }
    }

    return data;
  }, [history, timeRange, currentScore, t, language]);

  // Favorite brands from REAL scan history
  const favoriteBrands = useMemo(() => {
    const brandCounts = history.reduce((acc, item) => {
      const brand = item.product.brand || 'Unknown';
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5) // Top 5
      .map(([brand, count]) => ({ brand, count }));
  }, [history]);

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
            {history.length > 0 ? (
              <>
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
                      domain={[0, 100]}
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
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {timeRange === 'week' ? t.stats.weeklyOverview : t.stats.trend}
                </p>
              </>
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-900 font-medium mb-1">{t.history.noHistory}</p>
                <p className="text-xs text-muted-foreground">
                  {t.home.emptyState.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Top Brands Ranking */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#F97316]" />
            <h3>{t.stats.topBrands}</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            {favoriteBrands.length > 0 ? (
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
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {t.history.noHistory}
              </p>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">{t.stats.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#22C55E]">{currentScore}</p>
              <p className="text-xs text-muted-foreground">{t.stats.currentScore}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className={`text-3xl mb-1 ${scoreTrend >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {scoreTrend > 0 ? '+' : ''}{scoreTrend}
              </p>
              <p className="text-xs text-muted-foreground">Trend</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#3B82F6]">{totalScans}</p>
              <p className="text-xs text-muted-foreground">{t.stats.totalScans}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl mb-1 text-[#EF4444]">{favoritesCount}</p>
              <p className="text-xs text-muted-foreground">{t.stats.favorites}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
