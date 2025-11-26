import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ProductCard } from '../ProductCard';
import { demoProducts } from '../../lib/demo-data';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const categories = ['All', ...Array.from(new Set(demoProducts.map(p => p.category)))];
  const statuses = [
    { value: 'suitable', label: t.search.statusLabels.safe, color: 'bg-[#22C55E]' },
    { value: 'questionable', label: t.search.statusLabels.caution, color: 'bg-[#F97316]' },
    { value: 'not-recommended', label: t.search.statusLabels.avoid, color: 'bg-[#EF4444]' }
  ];

  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory ||
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(product.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleStatus = (statusValue: string) => {
    setSelectedStatuses(prev =>
      prev.includes(statusValue)
        ? prev.filter(s => s !== statusValue)
        : [...prev, statusValue]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedStatuses([]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedStatuses.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1>{t.search.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t.search.subtitle}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={t.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 bg-white rounded-2xl border-gray-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-md mx-auto px-6 pb-6 space-y-5">
        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p>{t.search.categories}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap px-4 py-2 rounded-xl transition-all ${selectedCategory === category || (category === 'All' && !selectedCategory)
                    ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]/90'
                    : 'hover:border-[#22C55E]/50'
                  }`}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p>{t.search.filterByStatus}</p>
            {selectedStatuses.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {selectedStatuses.length} {t.search.selected}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {statuses.map((status) => {
              const isSelected = selectedStatuses.includes(status.value);
              return (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`py-2.5 rounded-xl transition-all text-center border-2 ${isSelected
                      ? `${status.color} text-white border-transparent`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <span className="text-xs">{status.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full h-12 rounded-2xl border-gray-200 hover:bg-white"
          >
            <X className="w-4 h-4 mr-2" />
            {t.search.clearFilters}
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="max-w-md mx-auto px-6 pb-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">{t.search.noResults}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t.search.tryAdjusting}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} {t.search.found}
            </p>
            <div className="space-y-3">
              {filteredProducts.map((product, index) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
