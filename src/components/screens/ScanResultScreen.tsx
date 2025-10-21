import { ChevronLeft, CheckCircle2, AlertTriangle, XCircle, Heart, Share2, Camera, GitCompare } from 'lucide-react';
import { Product, demoProducts, demoScanHistory } from '../../lib/demo-data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ProductCard } from '../ProductCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface ScanResultScreenProps {
  product: Product;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function ScanResultScreen({ product, onNavigate, onBack }: ScanResultScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);

  const getStatusConfig = (status: Product['status']) => {
    switch (status) {
      case 'suitable':
        return {
          icon: CheckCircle2,
          color: 'text-[#22C55E]',
          bg: 'bg-[#22C55E]',
          label: 'Suitable for You',
          description: 'This product matches your dietary profile and health goals.'
        };
      case 'questionable':
        return {
          icon: AlertTriangle,
          color: 'text-[#F97316]',
          bg: 'bg-[#F97316]',
          label: 'Review Needed',
          description: 'This product has some concerns. Check the details below.'
        };
      case 'not-recommended':
        return {
          icon: XCircle,
          color: 'text-[#EF4444]',
          bg: 'bg-[#EF4444]',
          label: 'Not Recommended',
          description: 'This product conflicts with your dietary profile.'
        };
    }
  };

  const statusConfig = getStatusConfig(product.status);
  const StatusIcon = statusConfig.icon;
  
  const alternativeProducts = demoProducts
    .filter(p => p.id !== product.id && p.status === 'suitable' && p.category === product.category)
    .slice(0, 2);

  const historyProducts = demoScanHistory
    .filter(item => item.product.id !== product.id)
    .map(item => item.product)
    .slice(0, 5);

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] pb-20 animate-in fade-in duration-300">
        {/* Header with back button - always visible */}
        <div className={`${statusConfig.bg} text-white p-4 pb-6 sticky top-0 z-20`}>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowComparisonDialog(true)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <GitCompare className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          
          <div className="flex items-center gap-3 mb-2">
            <StatusIcon className="w-8 h-8" />
            <div>
              <h2 className="text-white">{statusConfig.label}</h2>
              <p className="text-sm text-white/80">{statusConfig.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="max-w-md mx-auto px-6 -mt-2">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-8 duration-500">
          <ImageWithFallback 
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h2 className="mt-1">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-sm text-muted-foreground">Nutrition Score:</span>
                <span className={statusConfig.color}>{product.nutritionScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Generated Description */}
        {product.aiDescription && (
          <div className="mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Personalized Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.aiDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Issues/Benefits */}
        {(product.issues || product.benefits) && (
          <div className="mt-4 space-y-3">
            {product.benefits && product.benefits.length > 0 && (
              <div className="bg-[#22C55E]/10 rounded-2xl p-4 border border-[#22C55E]/20">
                <h3 className="text-[#22C55E]">Benefits</h3>
                <ul className="mt-2 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.issues && product.issues.length > 0 && (
              <div className="bg-[#EF4444]/10 rounded-2xl p-4 border border-[#EF4444]/20">
                <h3 className="text-[#EF4444]">Concerns</h3>
                <ul className="mt-2 space-y-1">
                  {product.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Ingredients */}
        <div className="mt-4 bg-card rounded-2xl p-4 border border-border">
          <h3>Ingredients</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {product.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        {/* Allergens */}
        {product.allergens.length > 0 && (
          <div className="mt-4 bg-card rounded-2xl p-4 border border-border">
            <h3>Allergen Information</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.allergens.map((allergen, index) => (
                <Badge key={index} variant="destructive" className="bg-[#EF4444]">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Better Alternatives */}
        {alternativeProducts.length > 0 && (
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3>Better Alternatives</h3>
              <button 
                onClick={() => onNavigate('recommendations')}
                className="text-sm text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
              >
                See all
              </button>
            </div>
            <div className="space-y-3">
              {alternativeProducts.map((altProduct, index) => (
                <div 
                  key={altProduct.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard 
                    product={altProduct}
                    onClick={() => onNavigate('scan-result', { product: altProduct })}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 mb-6 space-y-3">
          <Button 
            className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
            onClick={onBack}
          >
            <Camera className="w-5 h-5 mr-2" />
            Scan Another
          </Button>
          <Button 
            variant="outline"
            className="w-full h-14 rounded-2xl"
            onClick={() => setShowComparisonDialog(true)}
          >
            <GitCompare className="w-5 h-5 mr-2" />
            Compare with Other Products
          </Button>
          {alternativeProducts.length > 0 && (
            <Button 
              variant="outline"
              className="w-full h-14 rounded-2xl"
              onClick={() => onNavigate('recommendations')}
            >
              View Similar Products
            </Button>
          )}
        </div>
      </div>
    </div>

    {/* Comparison Dialog */}
    <Dialog open={showComparisonDialog} onOpenChange={setShowComparisonDialog}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Products</DialogTitle>
          <DialogDescription>
            Choose a product from your history to compare with {product.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {/* Option to scan new product */}
          <button
            onClick={() => {
              setShowComparisonDialog(false);
              onNavigate('camera');
            }}
            className="w-full bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-2xl p-4 border border-[#22C55E]/20 hover:border-[#22C55E]/40 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <p>Scan New Product</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Use camera to scan another product
                </p>
              </div>
            </div>
          </button>

          {/* History products */}
          {historyProducts.length > 0 && (
            <>
              <div className="flex items-center gap-2 mt-4 mb-2">
                <div className="h-px bg-border flex-1" />
                <span className="text-xs text-muted-foreground">or choose from history</span>
                <div className="h-px bg-border flex-1" />
              </div>
              
              {historyProducts.map((historyProduct) => {
                const statusConfig = getStatusConfig(historyProduct.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <button
                    key={historyProduct.id}
                    onClick={() => {
                      setShowComparisonDialog(false);
                      onNavigate('comparison', { products: [product, historyProduct] });
                    }}
                    className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-3 p-3">
                      <ImageWithFallback 
                        src={historyProduct.image}
                        alt={historyProduct.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{historyProduct.brand}</p>
                        <p className="text-sm mt-0.5 truncate">{historyProduct.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                          <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                          <span className="text-xs text-muted-foreground ml-auto">Score: {historyProduct.nutritionScore}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
}
