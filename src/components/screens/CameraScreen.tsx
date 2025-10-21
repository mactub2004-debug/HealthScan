import { useState, useEffect } from 'react';
import { X, Camera, Flashlight, ScanBarcode } from 'lucide-react';
import { demoProducts } from '../../lib/demo-data';

interface CameraScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onClose: () => void;
}

export function CameraScreen({ onNavigate, onClose }: CameraScreenProps) {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [scanMode, setScanMode] = useState<'camera' | 'barcode'>('barcode');
  const [isScanning, setIsScanning] = useState(false);

  // Auto-scan simulation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isScanning) {
        handleAutoScan();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAutoScan = () => {
    setIsScanning(true);
    // Simulate scanning - select a random product
    setTimeout(() => {
      const randomProduct = demoProducts[Math.floor(Math.random() * demoProducts.length)];
      onNavigate('scan-result', { product: randomProduct });
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera viewfinder simulation */}
      <div className="flex-1 relative">
        {/* Mock camera background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/30 text-center">
              <Camera className="w-20 h-20 mx-auto mb-4" />
              <p>Camera View</p>
            </div>
          </div>
        </div>

        {/* Scanning frame */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full max-w-sm aspect-[4/3]">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#22C55E] rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#22C55E] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#22C55E] rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#22C55E] rounded-br-2xl" />
            
            {/* Scanning line animation */}
            {isScanning ? (
              <div className="absolute inset-0 bg-[#22C55E]/20 animate-pulse flex items-center justify-center">
                <p className="text-[#22C55E] font-semibold">Scanning...</p>
              </div>
            ) : (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-1 bg-[#22C55E]/50 animate-pulse" 
                     style={{ top: '50%' }} />
              </div>
            )}

            {/* Instructions */}
            <div className="absolute -bottom-16 left-0 right-0 text-center px-4">
              <p className="text-white text-sm">
                {scanMode === 'barcode' ? 'Position barcode within frame' : 'Center the product label'}
              </p>
            </div>
          </div>
        </div>

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-all active:scale-95 border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <p className="text-white text-sm">
              {scanMode === 'barcode' ? 'Scan Barcode' : 'Take Photo'}
            </p>
          </div>

          <button 
            onClick={() => setIsFlashOn(!isFlashOn)}
            className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-95 ${
              isFlashOn ? 'bg-[#F97316] shadow-lg shadow-[#F97316]/30 border border-[#F97316]' : 'bg-black/50 hover:bg-black/70 border border-white/10'
            }`}
          >
            <Flashlight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="bg-gradient-to-t from-black via-black/95 to-black/80 p-6 pb-8 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          {/* Mode toggle */}
          <div className="flex gap-3 bg-white/10 rounded-2xl p-1.5 backdrop-blur-md">
            <button
              onClick={() => setScanMode('barcode')}
              className={`flex-1 py-3.5 rounded-xl transition-all flex flex-col items-center gap-1 ${
                scanMode === 'barcode' 
                  ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/30' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <ScanBarcode className={`w-6 h-6 ${scanMode === 'barcode' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">Barcode</span>
            </button>
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 py-3.5 rounded-xl transition-all flex flex-col items-center gap-1 ${
                scanMode === 'camera' 
                  ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/30' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Camera className={`w-6 h-6 ${scanMode === 'camera' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">Photo</span>
            </button>
          </div>

          <p className="text-white/70 text-center text-sm mt-4">
            {isScanning ? 'Processing...' : 'Automatic scanning in progress'}
          </p>
        </div>
      </div>
    </div>
  );
}
