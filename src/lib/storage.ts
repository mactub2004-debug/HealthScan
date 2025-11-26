import { UserProfile, ScanHistoryItem, Product, demoUserProfile, demoScanHistory } from './demo-data';

const KEYS = {
  USER_PROFILE: 'healthscan_user_profile',
  SCAN_HISTORY: 'healthscan_history',
};

export const StorageService = {
  // User Profile
  getUserProfile: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading user profile', e);
      return null;
    }
  },

  saveUserProfile: (profile: UserProfile) => {
    try {
      localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving user profile', e);
    }
  },

  clearUserProfile: () => {
    try {
      localStorage.removeItem(KEYS.USER_PROFILE);
    } catch (e) {
      console.error('Error clearing user profile', e);
    }
  },

  // Scan History
  getScanHistory: (): ScanHistoryItem[] => {
    try {
      const data = localStorage.getItem(KEYS.SCAN_HISTORY);
      if (!data) return [];

      // Need to revive dates
      const parsed = JSON.parse(data);
      return parsed.map((item: any) => ({
        ...item,
        scannedAt: new Date(item.scannedAt)
      }));
    } catch (e) {
      console.error('Error reading scan history', e);
      return [];
    }
  },

  addScanHistoryItem: (product: Product) => {
    try {
      const history = StorageService.getScanHistory();
      const newItem: ScanHistoryItem = {
        id: crypto.randomUUID(),
        product,
        scannedAt: new Date(),
        isFavorite: false
      };

      const updatedHistory = [newItem, ...history];
      localStorage.setItem(KEYS.SCAN_HISTORY, JSON.stringify(updatedHistory));
      return newItem;
    } catch (e) {
      console.error('Error adding scan history item', e);
      return null;
    }
  },

  toggleFavorite: (productId: string) => {
    try {
      const history = StorageService.getScanHistory();
      // Check if product is currently favorited (if any history item for this product is favorite)
      const isCurrentlyFavorite = history.some(item => item.product.id === productId && item.isFavorite);
      const newStatus = !isCurrentlyFavorite;

      const updatedHistory = history.map(item =>
        item.product.id === productId ? { ...item, isFavorite: newStatus } : item
      );
      localStorage.setItem(KEYS.SCAN_HISTORY, JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (e) {
      console.error('Error toggling favorite', e);
      return [];
    }
  },

  deleteScanHistoryItem: (historyId: string) => {
    try {
      const history = StorageService.getScanHistory();
      const updatedHistory = history.filter(item => item.id !== historyId);
      localStorage.setItem(KEYS.SCAN_HISTORY, JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (e) {
      console.error('Error deleting history item', e);
      return [];
    }
  },

  // Helper to initialize demo data if needed (optional, for testing)
  initializeDemoData: () => {
    if (!StorageService.getUserProfile()) {
      StorageService.saveUserProfile(demoUserProfile);
    }
    if (StorageService.getScanHistory().length === 0) {
      localStorage.setItem(KEYS.SCAN_HISTORY, JSON.stringify(demoScanHistory));
    }
  }
};
