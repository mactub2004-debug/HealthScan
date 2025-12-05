import { Product, demoProducts, UserProfile } from '../lib/demo-data';
import { StorageService } from '../lib/storage';

export const ProductService = {
    /**
     * Get all products for display, merging demo data with scan history.
     * If a product has been scanned, use the scanned version (with score/status)
     * instead of the static demo version.
     * ALSO includes products that were scanned but are NOT in demo data.
     */
    getAllProducts: (): Product[] => {
        const history = StorageService.getScanHistory();

        // Create a map of scanned products by ID for fast lookup
        // Use the MOST RECENT scan for each product
        const scannedProductMap = new Map<string, Product>();
        history.forEach(item => {
            if (!scannedProductMap.has(item.product.id)) {
                scannedProductMap.set(item.product.id, item.product);
            }
        });

        // Track which demo product IDs we've processed
        const demoProductIds = new Set(demoProducts.map(p => p.id));

        // Merge demo products with scanned data
        const merged = demoProducts.map(demoProduct => {
            const scannedVersion = scannedProductMap.get(demoProduct.id);
            if (scannedVersion && scannedVersion.nutritionScore !== undefined) {
                return scannedVersion;
            }
            return demoProduct;
        });

        // Add scanned products that are NOT in demo data (new products)
        const newScannedProducts: Product[] = [];
        scannedProductMap.forEach((product, id) => {
            if (!demoProductIds.has(id)) {
                newScannedProducts.push(product);
            }
        });

        // Combine: scanned products first (most relevant), then demo products
        const allProducts = [...newScannedProducts, ...merged];

        console.log('📦 ProductService: Total products:', allProducts.length, '(', newScannedProducts.length, 'new scanned)');

        return allProducts;
    },

    /**
     * Get recommended products based on user profile rules (NO AI).
     * Rules:
     * 1. EXCLUDE products containing user allergens.
     * 2. PRIORITIZE products matching goals (simple heuristics).
     */
    getRecommendedProducts: (userProfile: UserProfile): Product[] => {
        const allProducts = ProductService.getAllProducts();

        // Map user allergen names to technical IDs
        const allergenMap: Record<string, string> = {
            'Milk': 'milk', 'Leche': 'milk',
            'Peanuts': 'peanuts', 'Maní': 'peanuts', 'Cacahuates': 'peanuts',
            'Gluten': 'gluten',
            'Soy': 'soy', 'Soja': 'soy',
            'Tree Nuts': 'tree_nuts', 'Frutos secos': 'tree_nuts',
            'Wheat': 'wheat', 'Trigo': 'wheat',
            'Eggs': 'eggs', 'Huevos': 'eggs',
            'Fish': 'fish', 'Pescado': 'fish',
            'Shellfish': 'shellfish', 'Mariscos': 'shellfish'
        };

        // Helper to check safety
        const isSafe = (product: Product) => {
            if (!product.allergens || product.allergens.length === 0) return true;
            return !userProfile.allergies.some(userAllergen => {
                const normalizedUserAllergen = allergenMap[userAllergen] || userAllergen.toLowerCase();
                return product.allergens!.some(productAllergen =>
                    productAllergen.toLowerCase() === normalizedUserAllergen
                );
            });
        };

        // 1. Always include SCANNED products (so user can see what they scanned, even if not recommended)
        // Identify scanned products by checking if they are NOT in the original demo set OR if they have a score (modified)
        const scannedProducts = allProducts.filter(p => !demoProducts.find(dp => dp.id === p.id) || p.nutritionScore !== undefined);

        // 2. Filter DEMO products for safety (recommendations should be safe)
        const safeDemoProducts = demoProducts.filter(p =>
            !scannedProducts.find(sp => sp.id === p.id) && isSafe(p)
        );

        // Combine: Scanned first, then safe recommendations
        const combined = [...scannedProducts, ...safeDemoProducts];

        // 3. Score based on goals (Simple Heuristic)
        const scoredProducts = combined.map(product => {
            let score = 0;

            // Goal: Muscle Gain -> High Protein
            if (userProfile.goals.includes('Gain muscle') || userProfile.goals.includes('Ganar masa muscular')) {
                if (product.nutrition.protein > 10) score += 2;
                if (product.nutrition.protein > 20) score += 3;
            }

            // Goal: Lose Weight -> Low Calories / Low Sugar
            if (userProfile.goals.includes('Lose weight') || userProfile.goals.includes('Perder peso')) {
                if (product.nutrition.calories < 200) score += 2;
                if (product.nutrition.sugar < 5) score += 2;
            }

            // Goal: Eat Healthy -> High Fiber / Low Sodium
            if (userProfile.goals.includes('Eat healthy') || userProfile.goals.includes('Comer saludable')) {
                if (product.nutrition.fiber > 3) score += 1;
                if (product.nutrition.sodium < 140) score += 1;
                if (product.ingredients.length < 5) score += 2; // Less processed
            }

            return { product, score };
        });

        // Sort by score descending and take top 5
        return scoredProducts
            .sort((a, b) => b.score - a.score)
            .map(item => item.product)
            .slice(0, 5);
    },

    /**
     * Get a specific product by ID, preferring the scanned version.
     */
    getProductById: (id: string): Product | undefined => {
        const allProducts = ProductService.getAllProducts();
        return allProducts.find(p => p.id === id);
    }
};
