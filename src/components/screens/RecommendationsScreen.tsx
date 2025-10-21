import { Sparkles, TrendingUp, Award } from 'lucide-react';
import { ProductCard } from '../ProductCard';
import { demoProducts } from '../../lib/demo-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface RecommendationsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function RecommendationsScreen({ onNavigate }: RecommendationsScreenProps) {
  const forYou = demoProducts.filter(p => p.status === 'suitable');
  const trending = [...demoProducts].sort((a, b) => b.nutritionScore - a.nutritionScore).slice(0, 4);
  const topRated = demoProducts.filter(p => p.nutritionScore >= 85);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white px-6 pt-12 pb-10 rounded-b-3xl shadow-md">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-7 h-7" strokeWidth={2.5} />
            <h1 className="text-white">Smart Recommendations</h1>
          </div>
          <p className="text-white/90 text-sm">
            Personalized picks based on your profile
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 -mt-4">
        <Tabs defaultValue="for-you">
          <TabsList className="w-full bg-white shadow-sm rounded-2xl p-1.5 border border-gray-100">
            <TabsTrigger 
              value="for-you" 
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              For You
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <TrendingUp className="w-4 h-4 mr-1.5" />
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="top-rated" 
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Award className="w-4 h-4 mr-1.5" />
              Top Rated
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you" className="mt-6">
            <div className="mb-4">
              <h2>Matches Your Profile</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your allergies, preferences, and goals
              </p>
            </div>
            <div className="space-y-3">
              {forYou.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => onNavigate('scan-result', { product })}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="mb-4">
              <h2>Popular Right Now</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Most scanned by the community this week
              </p>
            </div>
            
            {/* Featured trending product */}
            <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-2xl p-4 border border-[#F97316]/20 mb-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#F97316]" />
                <span className="text-[#F97316]">Most Popular</span>
              </div>
              <ProductCard
                product={trending[0]}
                onClick={() => onNavigate('scan-result', { product: trending[0] })}
              />
            </div>

            <div className="space-y-3">
              {trending.slice(1).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => onNavigate('scan-result', { product })}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="mt-6">
            <div className="mb-4">
              <h2>Highest Nutrition Scores</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Products with excellent nutritional value
              </p>
            </div>
            <div className="space-y-3">
              {topRated.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => onNavigate('scan-result', { product })}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Smart Tip */}
        <div className="mt-6 mb-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div className="flex-1">
              <p>Personalization Tip</p>
              <p className="text-sm text-muted-foreground mt-1">
                The more products you scan, the better our recommendations become. Keep scanning to help us learn your preferences!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
