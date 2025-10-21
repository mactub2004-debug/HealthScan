import { useState } from 'react';
import { Clock, GitCompare, Trash2, ArrowRight } from 'lucide-react';
import { demoScanHistory, demoComparisons, ProductComparison } from '../../lib/demo-data';
import { ProductCard } from '../ProductCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HistoryScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [historyItems, setHistoryItems] = useState(demoScanHistory);
  const [comparisons] = useState(demoComparisons);

  const toggleFavorite = (id: string) => {
    setHistoryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      if (hours < 1) return 'Just now';
      return `${hours}h ago`;
    }
    
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1>History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {historyItems.length} products scanned
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
              Product History
            </TabsTrigger>
            <TabsTrigger 
              value="comparisons" 
              className="flex-1 rounded-xl data-[state=active]:bg-[#22C55E] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Comparisons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="px-6 mt-6">
            {historyItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">No scan history yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start scanning products to build your history
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyItems.map((item) => (
                  <div 
                    key={item.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <p className="text-sm text-muted-foreground">
                          {formatDate(item.scannedAt)}
                        </p>
                      </div>
                      <button className="text-muted-foreground hover:text-[#EF4444] transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <ProductCard
                      product={item.product}
                      onClick={() => onNavigate('scan-result', { product: item.product })}
                      isFavorite={item.isFavorite}
                      onToggleFavorite={() => toggleFavorite(item.id)}
                      showFavorite
                    />
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
                <p className="text-muted-foreground">No comparisons yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Compare products to make better choices
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comparisons.map((comparison) => (
                  <div 
                    key={comparison.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => {
                      // Navigate to comparison view - for now go to first product
                      onNavigate('scan-result', { product: comparison.products[0] });
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GitCompare className="w-4 h-4 text-[#22C55E]" />
                        <h3>{comparison.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comparison.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {comparison.products.map((product, index) => (
                        <div key={product.id} className="flex items-center flex-1">
                          <div className="relative flex-1">
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <ImageWithFallback 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-20 object-cover rounded-lg mb-2"
                              />
                              <p className="text-xs mb-0.5 line-clamp-1">{product.name}</p>
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  product.status === 'suitable' ? 'bg-[#22C55E]' :
                                  product.status === 'questionable' ? 'bg-[#F97316]' :
                                  'bg-[#EF4444]'
                                }`} />
                                <span className="text-xs text-muted-foreground">
                                  Score: {product.nutritionScore}
                                </span>
                              </div>
                            </div>
                          </div>
                          {index < comparison.products.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-[#22C55E] text-center">
                        Tap to view comparison details
                      </p>
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
