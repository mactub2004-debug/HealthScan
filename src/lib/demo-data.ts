// Demo data for HealthScan app

export type SuitabilityStatus = 'suitable' | 'questionable' | 'not-recommended';

export interface Product {
  id: string;
  name: string;
  brand: string;
  barcode: string;
  status: SuitabilityStatus;
  image: string;
  category: string;
  ingredients: string[];
  allergens: string[];
  nutritionScore: number;
  issues?: string[];
  benefits?: string[];
  aiDescription?: string;
}

export interface ScanHistoryItem {
  id: string;
  product: Product;
  scannedAt: Date;
  isFavorite: boolean;
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
    status: 'suitable',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
    category: 'Dairy Alternative',
    ingredients: ['Water', 'Organic Almonds', 'Sea Salt', 'Sunflower Lecithin'],
    allergens: ['Tree Nuts'],
    nutritionScore: 92,
    benefits: ['No added sugar', 'High in vitamin E', 'Low in calories'],
    aiDescription: 'This product is an excellent match for your nutrition goals. It\'s naturally low in calories and contains no added sugars, making it perfect for weight management. The high vitamin E content supports your overall health, and its organic certification aligns with your preference for clean, natural ingredients.'
  },
  {
    id: '2',
    name: 'Protein Energy Bar',
    brand: 'FitLife',
    barcode: '9876543210987',
    status: 'questionable',
    image: 'https://images.unsplash.com/photo-1604480133435-4b5f9804c899?w=400&h=400&fit=crop',
    category: 'Snacks',
    ingredients: ['Peanuts', 'Whey Protein', 'Sugar', 'Palm Oil', 'Soy Lecithin'],
    allergens: ['Peanuts', 'Milk', 'Soy'],
    nutritionScore: 65,
    issues: ['Contains palm oil', 'High sugar content'],
    benefits: ['High protein'],
    aiDescription: 'While this bar offers good protein content that could support your muscle-building goals, it contains peanuts which you\'re allergic to. Additionally, the high sugar content and palm oil don\'t align with your low-sugar preferences. We recommend exploring alternative protein bars without these ingredients.'
  },
  {
    id: '3',
    name: 'Instant Noodles',
    brand: 'QuickMeal',
    barcode: '5647382910234',
    status: 'not-recommended',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    category: 'Instant Food',
    ingredients: ['Wheat Flour', 'Palm Oil', 'Salt', 'MSG', 'Artificial Flavors'],
    allergens: ['Wheat', 'Gluten'],
    nutritionScore: 28,
    issues: ['High sodium', 'Contains MSG', 'Artificial additives', 'Low nutritional value'],
    aiDescription: 'This product does not match your health profile. The extremely high sodium content conflicts with your heart health goals, and the MSG and artificial additives don\'t support your preference for natural, organic foods. The low nutritional value makes it unsuitable for your weight loss and healthy eating objectives.'
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    brand: 'Dairy Fresh',
    barcode: '7362819045678',
    status: 'suitable',
    image: 'https://images.unsplash.com/photo-1571212515674-3fdb992e2c08?w=400&h=400&fit=crop',
    category: 'Dairy',
    ingredients: ['Milk', 'Live Active Cultures'],
    allergens: ['Milk'],
    nutritionScore: 88,
    benefits: ['High in protein', 'Probiotic', 'Low sugar', 'Rich in calcium'],
    aiDescription: 'Perfect choice for your nutrition plan! This Greek yogurt is exceptionally high in protein, supporting your muscle-building goals while remaining low in sugar for weight management. The probiotic cultures promote better digestion, and it\'s an excellent source of calcium for bone health. This aligns beautifully with your healthy eating objectives.'
  },
  {
    id: '5',
    name: 'Veggie Chips',
    brand: 'Healthy Snacks Co.',
    barcode: '3456789012345',
    status: 'questionable',
    image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&h=400&fit=crop',
    category: 'Snacks',
    ingredients: ['Potatoes', 'Vegetable Oil', 'Salt', 'Artificial Colors'],
    allergens: [],
    nutritionScore: 58,
    issues: ['High in fat', 'Contains artificial colors'],
    benefits: ['Gluten-free'],
    aiDescription: 'These veggie chips present a mixed picture for your dietary needs. While they\'re gluten-free and allergen-safe for you, the high fat content and artificial colors don\'t align with your preference for organic, natural foods. The oil used in frying adds unnecessary calories that may not support your weight loss goals. Consider baked alternatives instead.'
  },
  {
    id: '6',
    name: 'Quinoa Bowl',
    brand: 'Organic Eats',
    barcode: '8901234567890',
    status: 'suitable',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    category: 'Ready Meals',
    ingredients: ['Quinoa', 'Black Beans', 'Corn', 'Peppers', 'Olive Oil', 'Spices'],
    allergens: [],
    nutritionScore: 94,
    benefits: ['Complete protein', 'High fiber', 'Gluten-free', 'Vegan'],
    aiDescription: 'Outstanding match for your nutritional profile! This quinoa bowl provides complete plant-based protein supporting muscle development while being naturally gluten-free and vegan-friendly. The high fiber content aids digestion and weight management, and the organic ingredients align perfectly with your preference for clean eating. Highly recommended for your health goals.'
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
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Mexico',
  'Brazil',
  'Japan',
  'China',
  'India',
  'Other'
];

export const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Other'
];

export const commonAllergens = [
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
