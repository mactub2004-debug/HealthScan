import { useState, useRef } from 'react';
import { Heart, ChevronLeft, Trash2 } from 'lucide-react';
import { demoScanHistory } from '../../lib/demo-data';
import { ProductCard } from '../ProductCard';

interface FavoritesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function FavoritesScreen({ onNavigate, onBack }: FavoritesScreenProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    demoScanHistory.filter(item => item.isFavorite).map(item => item.id)
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragY, setDragY] = useState<number>(0);
  const dragStartY = useRef<number>(0);
  const deleteThreshold = 100; // pixels to drag up to delete

  const favoriteItems = demoScanHistory.filter(item => favoriteIds.includes(item.id));

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    dragStartY.current = e.touches[0].clientY;
    setDraggedItem(id);
    setDragY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedItem) return;
    const currentY = e.touches[0].clientY;
    const diff = dragStartY.current - currentY;
    
    // Only allow dragging upwards
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!draggedItem) return;
    
    // If dragged past threshold, delete the item
    if (dragY > deleteThreshold) {
      setFavoriteIds(favoriteIds.filter(fid => fid !== draggedItem));
    }
    
    setDraggedItem(null);
    setDragY(0);
    dragStartY.current = 0;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1>Favorites</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#22C55E] fill-[#22C55E]" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground pl-12">
            {favoriteItems.length} {favoriteItems.length === 1 ? 'product' : 'products'} saved
          </p>
        </div>
      </div>

      {/* Delete zone indicator */}
      {draggedItem && dragY > 50 && (
        <div 
          className={`fixed top-0 left-0 right-0 bg-[#EF4444] text-white flex items-center justify-center transition-all duration-200 z-20 ${
            dragY > deleteThreshold ? 'py-8' : 'py-4'
          }`}
        >
          <Trash2 className={`mr-2 transition-all duration-200 ${dragY > deleteThreshold ? 'w-6 h-6' : 'w-5 h-5'}`} />
          <span className={dragY > deleteThreshold ? 'font-medium' : ''}>
            {dragY > deleteThreshold ? 'Release to delete' : 'Drag here to delete'}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2">No favorites yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Products you mark as favorites will appear here for quick access
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center mb-4">
              Drag items up to delete them
            </p>
            {favoriteItems.map((item, index) => (
              <div 
                key={item.id}
                className={`animate-in fade-in slide-in-from-bottom-4 transition-all duration-200 ${
                  draggedItem === item.id ? 'opacity-80 scale-95' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: draggedItem === item.id ? `translateY(-${dragY}px)` : 'translateY(0)',
                }}
                onTouchStart={(e) => handleTouchStart(e, item.id)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <ProductCard 
                  product={item.product}
                  onClick={() => !draggedItem && onNavigate('scan-result', { product: item.product })}
                  showDate
                  date={item.scannedAt}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
