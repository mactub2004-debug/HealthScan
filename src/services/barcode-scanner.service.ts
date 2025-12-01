import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export class BarcodeScannerService {
    private codeReader: BrowserMultiFormatReader;
    private scanning: boolean = false;

    constructor() {
        this.codeReader = new BrowserMultiFormatReader();
    }

    /**
     * Start scanning for barcodes using the device camera
     */
    async startScanning(
        videoElement: HTMLVideoElement,
        onBarcodeDetected: (barcode: string) => void,
        onError?: (error: Error) => void
    ): Promise<void> {
        if (this.scanning) {
            return;
        }

        this.scanning = true;

        try {
            // Get available video devices
            const videoInputDevices = await this.codeReader.listVideoInputDevices();

            if (videoInputDevices.length === 0) {
                throw new Error('No camera found on this device');
            }

            // Prefer back camera on mobile devices
            const selectedDevice = videoInputDevices.find(device =>
                device.label.toLowerCase().includes('back') ||
                device.label.toLowerCase().includes('rear') ||
                device.label.toLowerCase().includes('environment')
            ) || videoInputDevices[0];

            // Start continuous scanning with hints for better detection
            this.codeReader.decodeFromVideoDevice(
                selectedDevice.deviceId,
                videoElement,
                (result, error) => {
                    if (result) {
                        const barcode = result.getText();
                        console.log('✅ Barcode detected:', barcode);
                        onBarcodeDetected(barcode);
                    }

                    if (error && !(error instanceof NotFoundException)) {
                        console.error('Barcode scanning error:', error);
                        if (onError) {
                            onError(error as Error);
                        }
                    }
                }
            );
        } catch (error) {
            console.error('Failed to start barcode scanner:', error);
            this.scanning = false;
            if (onError) {
                onError(error as Error);
            }
        }
    }

    /**
     * Stop scanning and release camera
     */
    stopScanning(): void {
        if (this.scanning) {
            this.codeReader.reset();
            this.scanning = false;
            console.log('🛑 Barcode scanning stopped');
        }
    }

    /**
     * Check if currently scanning
     */
    isScanning(): boolean {
        return this.scanning;
    }
}

// Singleton instance
export const barcodeScannerService = new BarcodeScannerService();
