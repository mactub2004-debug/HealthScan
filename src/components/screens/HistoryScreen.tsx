import { useState, useEffect } from 'react';
import { Clock, GitCompare, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { demoComparisons, ProductComparison, ScanHistoryItem } from '../../lib/demo-data';
import { StorageService } from '../../lib/storage';
import { ProductCard } from '../ProductCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../../contexts/LanguageContext';
import { analyzeProductWithAI } from '../../services/ai-analysis.service';

interface HistoryScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const { t, language } = useLanguage();
  const [historyItems, setHistoryItems] = useState<ScanHistoryItem[]>([]);
  const [comparisons] = useState(demoComparisons);
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

  useEffect(() => {
    setHistoryItems(StorageService.getScanHistory());
  }, []);

  const toggleFavorite = (productId: string) => {
    const updated = StorageService.toggleFavorite(productId);
    setHistoryItems(updated);
  };

  const deleteItem = (historyId: string) => {
    const updated = StorageService.deleteScanHistoryItem(historyId);
    setHistoryItems(updated);
  };

  const formatDate = (date: Date | string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      if (hours < 1) return t.history.time.justNow;
      return `${hours}${t.history.time.ago}`;
    }

    const days = Math.floor(hours / 24);
    if (days === 1) return t.history.time.yesterday;
    return `${days} ${t.history.time.daysAgo}`;
  };

  const handleProductClick = async (product: any) => {
    setIsAnalyzing(product.id);

    try {
      const userProfile = StorageService.getUserProfile();

      if (userProfile) {
        // Re-analyze with AI to ensure current language and fresh insights
        const aiResult = await analyzeProductWithAI(product, userProfile, language);

        // Merge AI results
        const enrichedProduct = {
          ...product,
          status: aiResult.status,
          nutritionScore: aiResult.nutritionScore,
          benefits: aiResult.benefits,
          issues: aiResult.issues,
          aiDescription: aiResult.aiDescription,
          ingredients: aiResult.ingredients || product.ingredients,
          allergens: aiResult.allergens || product.allergens
        };

        onNavigate('scan-result', { product: enrichedProduct });
      } else {
        onNavigate('scan-result', { product });
      }
    } catch (error) {
      console.error('Error analyzing product:', error);
      onNavigate('scan-result', { product });
    } finally {
      setIsAnalyzing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1>{t.history.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {historyItems.length} {t.history.scannedCount}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="products" className="mt-6">
          <TabsList className="w-full mx-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
            <TabsTrigger
              value="products"
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Clock className="w-4 h-4 mr-2" />
              {t.history.tabs.products}
            </TabsTrigger>
            <TabsTrigger
              value="comparisons"
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              {t.history.tabs.comparisons}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="px-6 mt-6">
            {historyItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">{t.history.noHistory}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.history.startScanning}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="animate-in fade-in slide-in-from-bottom-4 relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <p className="text-sm text-muted-foreground">
                          {formatDate(item.scannedAt)}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-muted-foreground hover:text-[#EF4444] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <ProductCard
                      product={item.product}
                      onClick={() => handleProductClick(item.product)}
                      isFavorite={item.isFavorite}
                      onToggleFavorite={() => toggleFavorite(item.product.id)}
                      showFavorite
                    />
                    {isAnalyzing === item.product.id && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10 top-8">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 text-[#28C567] animate-spin" />
                          <span className="text-sm font-medium text-[#28C567]">{t.common.loading}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparisons" className="px-6 mt-6">
            {comparisons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <GitCompare className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">{t.history.noComparisons}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.history.compareHint}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comparisons.map((comparison) => (
                  <div
                    key={comparison.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => handleProductClick(comparison.products[0])}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GitCompare className="w-4 h-4 text-[#22C55E]" />
                        <h3>{comparison.title}</h3>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      {comparison.products.map((p, i) => (
                        <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                          <ImageWithFallback
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatDate(comparison.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
