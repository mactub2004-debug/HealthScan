import { useState, useEffect, useRef } from 'react';
import { X, Camera, Flashlight, ScanBarcode, AlertCircle } from 'lucide-react';
import { barcodeScannerService } from '../../services/barcode-scanner.service';
import { findProductByBarcode } from '../../services/product-database.service';
import { analyzeProductWithAI } from '../../services/ai-analysis.service';
import { StorageService } from '../../lib/storage';
import { useLanguage } from '../../contexts/LanguageContext';

interface CameraScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onClose: () => void;
}

export function CameraScreen({ onNavigate, onClose }: CameraScreenProps) {
  const { language } = useLanguage();
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [scanMode, setScanMode] = useState<'camera' | 'barcode'>('barcode');
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedBarcode, setLastScannedBarcode] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scanMode === 'barcode' && videoRef.current) {
      startBarcodeScanning();
    }

    return () => {
      stopScanning();
    };
  }, [scanMode]);

  const startBarcodeScanning = async () => {
    if (!videoRef.current) return;

    setIsScanning(true);
    setError(null);

    try {
      await barcodeScannerService.startScanning(
        videoRef.current,
        handleBarcodeDetected,
        handleScanError
      );
    } catch (err) {
      handleScanError(err as Error);
    }
  };

  const stopScanning = () => {
    barcodeScannerService.stopScanning();
    setIsScanning(false);
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };

  const handleBarcodeDetected = async (barcode: string) => {
    // Prevent duplicate scans with debounce
    if (lastScannedBarcode === barcode || isAnalyzing) {
      console.log('⏭️ Skipping duplicate scan:', barcode);
      return;
    }

    setLastScannedBarcode(barcode);
    setIsAnalyzing(true);
    stopScanning();

    console.log('🔍 Searching for barcode:', barcode);

    const product = findProductByBarcode(barcode);

    if (!product) {
      setError(`Producto no encontrado (código: ${barcode})`);
      setIsAnalyzing(false);

      scanTimeoutRef.current = setTimeout(() => {
        setError(null);
        setLastScannedBarcode(null);
        if (scanMode === 'barcode') {
          startBarcodeScanning();
        }
      }, 3000);
      return;
    }

    console.log('✅ Product found:', product.name);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Get user profile and analyze with AI in the current language
    const userProfile = StorageService.getUserProfile();
    if (userProfile) {
      try {
        console.log(`🤖 Analyzing product in ${language}...`);
        const aiResult = await analyzeProductWithAI(product, userProfile, language);

        // Merge AI results with product
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

        // Navigate with enriched product
        onNavigate('scan-result', { product: enrichedProduct });
      } catch (error) {
        console.error('AI analysis failed, using basic product:', error);
        // Navigate with basic product if AI fails
        onNavigate('scan-result', { product });
      }
    } else {
      // No user profile, navigate with basic product
      onNavigate('scan-result', { product });
    }

    setIsAnalyzing(false);
  };

  const handleScanError = (err: Error) => {
    console.error('Scan error:', err);
    setError(err.message);
    setIsScanning(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />

        {scanMode !== 'barcode' && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
            <div className="text-white/30 text-center">
              <Camera className="w-20 h-20 mx-auto mb-4" />
              <p>Photo mode - Coming soon</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full max-w-sm aspect-[4/3]">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#22C55E] rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#22C55E] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#22C55E] rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#22C55E] rounded-br-2xl" />

            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#22C55E]/20 animate-pulse flex items-center justify-center">
                <div className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <p className="text-white font-semibold">Analizando...</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 bg-[#EF4444]/20 flex items-center justify-center">
                <div className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-4 max-w-xs">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    <p className="text-white text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {isScanning && !isAnalyzing && !error && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-1 bg-[#22C55E] animate-pulse shadow-lg shadow-[#22C55E]/50"
                  style={{
                    top: '50%',
                    animation: 'scan 2s ease-in-out infinite'
                  }}
                />
              </div>
            )}

            <div className="absolute -bottom-16 left-0 right-0 text-center px-4">
              <p className="text-white text-sm drop-shadow-lg">
                {isAnalyzing
                  ? 'Analizando producto...'
                  : error
                    ? 'Intenta de nuevo'
                    : scanMode === 'barcode'
                      ? 'Posiciona el código de barras dentro del marco'
                      : 'Centra la etiqueta del producto'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-all active:scale-95 border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <p className="text-white text-sm">
              {scanMode === 'barcode' ? 'Escanear Código' : 'Tomar Foto'}
            </p>
          </div>

          <button
            onClick={() => setIsFlashOn(!isFlashOn)}
            className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-95 ${isFlashOn
              ? 'bg-[#F97316] shadow-lg shadow-[#F97316]/30 border border-[#F97316]'
              : 'bg-black/50 hover:bg-black/70 border border-white/10'
              }`}
          >
            <Flashlight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-t from-black via-black/95 to-black/80 p-6 pb-8 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3 bg-white/10 rounded-2xl p-1.5 backdrop-blur-md">
            <button
              onClick={() => setScanMode('barcode')}
              className={`flex-1 py-3.5 rounded-xl transition-all flex flex-col items-center gap-1 ${scanMode === 'barcode'
                ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/30'
                : 'text-white/60 hover:text-white/80'
                }`}
            >
              <ScanBarcode className={`w-6 h-6 ${scanMode === 'barcode' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">Código de Barras</span>
            </button>
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 py-3.5 rounded-xl transition-all flex flex-col items-center gap-1 ${scanMode === 'camera'
                ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/30'
                : 'text-white/60 hover:text-white/80'
                }`}
            >
              <Camera className={`w-6 h-6 ${scanMode === 'camera' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">Foto</span>
            </button>
          </div>

          <p className="text-white/70 text-center text-sm mt-4">
            {isAnalyzing
              ? 'Procesando...'
              : isScanning
                ? 'Escaneo automático activo'
                : 'Listo para escanear'}
          </p>
        </div>

        <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
      </div>
    </div>
  );
}
