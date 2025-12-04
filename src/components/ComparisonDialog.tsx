import { Camera, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product, ScanHistoryItem } from '../lib/demo-data';
import { useLanguage } from '../contexts/LanguageContext';

interface ComparisonDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productName: string;
    historyProducts: Product[];
    onScanNew: () => void;
    onSelectProduct: (product: Product) => void;
}

export function ComparisonDialog({
    open,
    onOpenChange,
    productName,
    historyProducts,
    onScanNew,
    onSelectProduct
}: ComparisonDialogProps) {
    const { t } = useLanguage();

    const getStatusConfig = (status: Product['status']) => {
        switch (status) {
            case 'suitable':
                return {
                    icon: CheckCircle2,
                    color: 'text-[#22C55E]',
                    label: t.home.status.suitable
                };
            case 'questionable':
                return {
                    icon: AlertTriangle,
                    color: 'text-[#F97316]',
                    label: t.home.status.questionable
                };
            case 'not-recommended':
                return {
                    icon: XCircle,
                    color: 'text-[#EF4444]',
                    label: t.home.status.notRecommended
                };
            default:
                return {
                    icon: AlertTriangle,
                    color: 'text-gray-500',
                    label: t.home.status.unknown
                };
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t.scanResult.compare.title}</DialogTitle>
                    <DialogDescription>
                        {t.scanResult.compare.subtitle} {productName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto">
                    {/* Option to scan new product */}
                    <button
                        onClick={onScanNew}
                        className="w-full bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-2xl p-4 border border-[#22C55E]/20 hover:border-[#22C55E]/40 transition-all text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-medium">{t.scanResult.compare.scanNew}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {t.scanResult.compare.scanNewDesc}
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* History products */}
                    {historyProducts.length > 0 && (
                        <>
                            <div className="flex items-center gap-2 mt-4 mb-2">
                                <div className="h-px bg-border flex-1" />
                                <span className="text-xs text-muted-foreground">{t.scanResult.compare.orHistory}</span>
                                <div className="h-px bg-border flex-1" />
                            </div>

                            {historyProducts.map((historyProduct) => {
                                const statusConfig = getStatusConfig(historyProduct.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <button
                                        key={historyProduct.id}
                                        onClick={() => onSelectProduct(historyProduct)}
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
                                                <p className="text-sm font-medium mt-0.5 truncate">{historyProduct.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                                                    <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                                                    <span className="text-xs text-muted-foreground ml-auto">
                                                        {t.scanResult.nutritionScore}: {historyProduct.nutritionScore}
                                                    </span>
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
    );
}
