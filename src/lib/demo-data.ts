// Demo data for HealthScan app

export type SuitabilityStatus = 'suitable' | 'questionable' | 'not-recommended';

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  barcode: string;
  image: string;
  category: string;
  ingredients: string[];
  allergens: string[];
  nutrition: NutritionInfo;
  // Optional fields filled by AI
  status?: SuitabilityStatus;
  nutritionScore?: number;
  issues?: string[];
  benefits?: string[];
  aiDescription?: string;
}

export interface ScanHistoryItem {
  id: string;
  product: Product;
  scannedAt: Date;
  isFavorite: boolean;
  isPurchased?: boolean;
}

export interface ProductComparison {
  id: string;
  products: Product[];
  createdAt: Date;
  title: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  country: string;
  language: string;
  allergies: string[];
  preferences: string[];
  goals: string[];
}

export const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Almond Milk',
    brand: 'Nature\'s Best',
    barcode: '1234567890123',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
    category: 'Dairy Alternative',
    ingredients: ['Water', 'Organic Almonds', 'Sea Salt', 'Sunflower Lecithin'],
    allergens: ['Tree Nuts'],
    nutrition: {
      servingSize: '240ml',
      calories: 30,
      protein: 1,
      carbs: 1,
      sugar: 0,
      fat: 2.5,
      sodium: 150,
      fiber: 1
    }
  },
  {
    id: '2',
    name: 'Protein Energy Bar',
    brand: 'FitLife',
    barcode: '9876543210987',
    image: 'https://images.unsplash.com/photo-1604480133435-4b5f9804c899?w=400&h=400&fit=crop',
    category: 'Snacks',
    ingredients: ['Peanuts', 'Whey Protein', 'Sugar', 'Palm Oil', 'Soy Lecithin'],
    allergens: ['Peanuts', 'Milk', 'Soy'],
    nutrition: {
      servingSize: '45g',
      calories: 210,
      protein: 20,
      carbs: 22,
      sugar: 15,
      fat: 8,
      sodium: 180,
      fiber: 3
    }
  },
  {
    id: '3',
    name: 'Instant Noodles',
    brand: 'QuickMeal',
    barcode: '5647382910234',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    category: 'Instant Food',
    ingredients: ['Wheat Flour', 'Palm Oil', 'Salt', 'MSG', 'Artificial Flavors'],
    allergens: ['Wheat', 'Gluten'],
    nutrition: {
      servingSize: '85g',
      calories: 380,
      protein: 8,
      carbs: 52,
      sugar: 2,
      fat: 16,
      sodium: 1200,
      fiber: 2
    }
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    brand: 'Dairy Fresh',
    barcode: '7362819045678',
    image: 'https://images.unsplash.com/photo-1571212515674-3fdb992e2c08?w=400&h=400&fit=crop',
    category: 'Dairy',
    ingredients: ['Milk', 'Live Active Cultures'],
    allergens: ['Milk'],
    nutrition: {
      servingSize: '150g',
      calories: 90,
      protein: 15,
      carbs: 6,
      sugar: 4,
      fat: 0,
      sodium: 60,
      fiber: 0
    }
  },
  {
    id: '5',
    name: 'Veggie Chips',
    brand: 'Healthy Snacks Co.',
    barcode: '3456789012345',
    image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&h=400&fit=crop',
    category: 'Snacks',
    ingredients: ['Potatoes', 'Vegetable Oil', 'Salt', 'Artificial Colors'],
    allergens: [],
    nutrition: {
      servingSize: '28g',
      calories: 140,
      protein: 1,
      carbs: 18,
      sugar: 6,
      fat: 7,
      sodium: 130,
      fiber: 3
    }
  },
  {
    id: '6',
    name: 'Quinoa Bowl',
    brand: 'Organic Eats',
    barcode: '8901234567890',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    category: 'Ready Meals',
    ingredients: ['Quinoa', 'Black Beans', 'Corn', 'Peppers', 'Olive Oil', 'Spices'],
    allergens: [],
    nutrition: {
      servingSize: '350g',
      calories: 320,
      protein: 12,
      carbs: 45,
      sugar: 3,
      fat: 10,
      sodium: 400,
      fiber: 8
    }
  }
];

export const demoScanHistory: ScanHistoryItem[] = [
  {
    id: 'h1',
    product: demoProducts[0],
    scannedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isFavorite: true
  },
  {
    id: 'h2',
    product: demoProducts[3],
    scannedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isFavorite: true
  },
  {
    id: 'h3',
    product: demoProducts[1],
    scannedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isFavorite: false
  },
  {
    id: 'h4',
    product: demoProducts[2],
    scannedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isFavorite: false
  },
  {
    id: 'h5',
    product: demoProducts[5],
    scannedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    isFavorite: false
  }
];

export const demoComparisons: ProductComparison[] = [
  {
    id: 'c1',
    products: [demoProducts[0], demoProducts[3]],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    title: 'Dairy Alternatives'
  },
  {
    id: 'c2',
    products: [demoProducts[1], demoProducts[4]],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    title: 'Snack Options'
  }
];

export const demoUserProfile: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  country: 'United States',
  language: 'English',
  allergies: ['Peanuts', 'Shellfish'],
  preferences: ['Vegan-friendly', 'Organic', 'Low sugar'],
  goals: ['Lose weight', 'Build muscle', 'Eat healthier']
};

export const countries = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Dominican Republic',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Paraguay',
  'Peru',
  'Uruguay',
  'Venezuela'
];

export const languages = [
  'English',
  'Español'
];

export const commonAllergens = [
  'Gluten',
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soy',
  'Sesame'
];

export const dietaryPreferences = [
  'Vegan',
  'Vegetarian',
  'Gluten-free',
  'Dairy-free',
  'Organic',
  'Low sugar',
  'Low sodium',
  'High protein',
  'Keto-friendly',
  'Paleo'
];

export const healthGoals = [
  'Lose weight',
  'Gain muscle',
  'Maintain weight',
  'Improve energy',
  'Better digestion',
  'Heart health',
  'Manage diabetes',
  'Reduce cholesterol'
];
