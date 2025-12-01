import { CheckCircle2, AlertTriangle, XCircle, Heart } from 'lucide-react';
import { Product } from '../lib/demo-data';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFavorite?: boolean;
  showDate?: boolean;
  date?: Date;
}

export function ProductCard({
  product,
  onClick,
  isFavorite = false,
  onToggleFavorite,
  showFavorite = false,
  showDate = false,
  date
}: ProductCardProps) {
  const { t, language } = useLanguage();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Map language codes to Intl locales
    const localeMap: Record<string, string> = {
      'ES': 'es-ES',
      'EN': 'en-US'
    };
    const locale = localeMap[language] || 'es-ES';

    if (diffHours < 1) {
      return t.common.time.justNow;
    } else if (diffHours < 24) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(-diffHours, 'hour');
    } else if (diffDays < 7) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(-diffDays, 'day');
    } else {
      return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
    }
  };

  const getStatusConfig = (status: Product['status']) => {
    switch (status) {
      case 'suitable':
        return {
          icon: CheckCircle2,
          color: 'text-[#22C55E]',
          bg: 'bg-[#22C55E]/10',
          label: t.home.status.suitable
        };
      case 'questionable':
        return {
          icon: AlertTriangle,
          color: 'text-[#F97316]',
          bg: 'bg-[#F97316]/10',
          label: t.home.status.questionable
        };
      case 'not-recommended':
        return {
          icon: XCircle,
          color: 'text-[#EF4444]',
          bg: 'bg-[#EF4444]/10',
          label: t.home.status.notRecommended
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-500',
          bg: 'bg-gray-100',
          label: t.home.status.unknown
        };
    }
  };

  const statusConfig = getStatusConfig(product.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        {showFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-muted-foreground'}`}
            />
          </button>
        )}
        <div className={`absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.bg} backdrop-blur-sm`}>
          <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
          <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
        </div>
      </div>

      <div className="p-3">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <div className="flex items-center gap-1">
            <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${(product.nutritionScore || 0) >= 80 ? 'bg-[#22C55E]' :
                    (product.nutritionScore || 0) >= 60 ? 'bg-[#F97316]' :
                      'bg-[#EF4444]'
                  }`}
                style={{ width: `${product.nutritionScore || 0}%` }}
              />
            </div>
            <span className="text-xs">{product.nutritionScore ?? '?'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
