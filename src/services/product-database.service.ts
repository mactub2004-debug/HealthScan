import { Product } from '../lib/demo-data';
import productsDatabase from '../data/products-database.json';

export interface ProductDatabase {
    products: Product[];
}

/**
 * Search for a product by barcode in the local database
 */
export function findProductByBarcode(barcode: string): any | null {
    const database = productsDatabase as any;
    const dbProduct = database.products.find((p: any) => p.barcode === barcode);

    if (!dbProduct) {
        return null;
    }

    // Return product with nutrition data
    return {
        id: dbProduct.barcode,
        name: dbProduct.name,
        brand: dbProduct.brand,
        category: dbProduct.category,
        image: dbProduct.image,
        ingredients: dbProduct.ingredients,
        allergens: dbProduct.allergens,
        nutrition: dbProduct.nutrition, // Include nutrition data
        nutritionScore: 0,
        status: 'suitable',
        benefits: [],
        issues: [],
        aiDescription: ''
    };
}

/**
 * Get all products from database
 */
export function getAllProducts(): Product[] {
    const database = productsDatabase as ProductDatabase;
    return database.products.map(p => ({
        id: p.barcode,
        name: p.name,
        brand: p.brand,
        category: p.category,
        image: p.image,
        ingredients: p.ingredients,
        allergens: p.allergens,
        nutritionScore: 0,
        status: 'suitable',
        benefits: [],
        issues: [],
        aiDescription: ''
    }));
}
