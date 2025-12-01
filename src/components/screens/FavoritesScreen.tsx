import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, Trash2 } from 'lucide-react';
import { ScanHistoryItem } from '../../lib/demo-data';
import { StorageService } from '../../lib/storage';
import { ProductCard } from '../ProductCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface FavoritesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function FavoritesScreen({ onNavigate, onBack }: FavoritesScreenProps) {
  const { t } = useLanguage();
  const [favoriteItems, setFavoriteItems] = useState<ScanHistoryItem[]>([]);
  const [swipedItem, setSwipedItem] = useState<string | null>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  useEffect(() => {
    const history = StorageService.getScanHistory();
    setFavoriteItems(history.filter(item => item.isFavorite));
  }, []);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (id: string) => {
    if (!touchStartX.current || !touchCurrentX.current) return;

    const diff = touchStartX.current - touchCurrentX.current;
    const threshold = 50;

    // Swipe left (diff > 0) to show delete
    if (diff > threshold) {
      setSwipedItem(id);
    } else if (diff < -threshold) {
      // Swipe right to hide
      setSwipedItem(null);
    } else {
      // Tap or small movement, do nothing or reset if needed
      // If we want to toggle on tap, we handle that in onClick
    }

    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const handleDelete = (id: string) => {
    const itemToRemove = favoriteItems.find(item => item.id === id);
    if (itemToRemove) {
      const updatedHistory = StorageService.toggleFavorite(itemToRemove.product.id);
      setFavoriteItems(updatedHistory.filter(item => item.isFavorite));
    }
    setSwipedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors -ml-2">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1>{t.favorites.title}</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#22C55E] fill-[#22C55E]" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground pl-12">
            {favoriteItems.length} {t.favorites.savedCount}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2">{t.favorites.noFavorites}</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {t.favorites.hint}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center mb-4">
              {t.favorites.dragHint.replace('up', 'left')} {/* Adjust text dynamically or we should update translation later */}
            </p>
            {favoriteItems.map((item, index) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl"
              >
                {/* Delete background (revealed on swipe) */}
                <div className="absolute inset-0 bg-[#EF4444] flex items-center justify-end px-6 rounded-2xl">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>

                <div
                  className="relative bg-white transition-transform duration-200 ease-out"
                  style={{
                    transform: swipedItem === item.id ? 'translateX(-80px)' : 'translateX(0)'
                  }}
                  onTouchStart={(e) => handleTouchStart(e, item.id)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd(item.id)}
                >
                  <ProductCard
                    product={item.product}
                    onClick={() => {
                      if (swipedItem === item.id) {
                        setSwipedItem(null); // Close swipe on click if open
                      } else {
                        onNavigate('scan-result', { product: item.product });
                      }
                    }}
                    showDate
                    date={item.scannedAt}
                    isFavorite={true}
                  />
                </div>

                {/* Delete button overlay for clickability when swiped */}
                {swipedItem === item.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center z-10"
                  >
                    <span className="sr-only">Delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
