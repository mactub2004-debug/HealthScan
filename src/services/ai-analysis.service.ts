import { Mistral } from '@mistralai/mistralai';
import { Product } from '../lib/demo-data';
import { UserProfile } from '../lib/storage';
import { Language } from '../lib/translations';

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

if (!apiKey) {
    console.warn('⚠️ VITE_MISTRAL_API_KEY not found. AI analysis will use fallback mode.');
}

const client = apiKey ? new Mistral({ apiKey }) : null;

export interface AIAnalysisResult {
    status: 'suitable' | 'questionable' | 'not-recommended';
    nutritionScore: number;
    benefits: string[];
    issues: string[];
    aiDescription: string;
    ingredients?: string[];
    allergens?: string[];
}

// Emergency translation dictionary for fallback mode
const INGREDIENT_TRANSLATIONS: Record<string, string> = {
    'Water': 'Agua',
    'Milk': 'Leche',
    'Sugar': 'Azúcar',
    'Salt': 'Sal',
    'Peanuts': 'Cacahuetes',
    'Wheat': 'Trigo',
    'Soy': 'Soja',
    'Eggs': 'Huevos',
    'Tree Nuts': 'Frutos de cáscara',
    'Almonds': 'Almendras',
    'Organic Almonds': 'Almendras orgánicas',
    'Sea Salt': 'Sal marina',
    'Sunflower Lecithin': 'Lecitina de girasol',
    'Whey Protein': 'Proteína de suero',
    'Palm Oil': 'Aceite de palma',
    'Soy Lecithin': 'Lecitina de soja',
    'Wheat Flour': 'Harina de trigo',
    'MSG': 'Glutamato monosódico',
    'Artificial Flavors': 'Sabores artificiales',
    'Live Active Cultures': 'Cultivos activos vivos',
    'Potatoes': 'Patatas',
    'Vegetable Oil': 'Aceite vegetal',
    'Artificial Colors': 'Colorantes artificiales',
    'Quinoa': 'Quinua',
    'Black Beans': 'Frijoles negros',
    'Corn': 'Maíz',
    'Peppers': 'Pimientos',
    'Olive Oil': 'Aceite de oliva',
    'Spices': 'Especias',
    'Gluten': 'Gluten'
};

/**
 * AI Prompts in different languages
 */
const AI_PROMPTS = {
    ES: {
        role: 'Eres un experto nutricionista estricto.',
        product: 'PRODUCTO',
        name: 'Nombre',
        brand: 'Marca',
        category: 'Categoría',
        ingredients: 'Ingredientes',
        allergens: 'Alérgenos',
        none: 'Ninguno',
        nutritionInfo: 'Información nutricional (por',
        calories: 'Calorías',
        protein: 'Proteínas',
        carbs: 'Carbohidratos',
        sugar: 'Azúcares',
        fat: 'Grasas',
        sodium: 'Sodio',
        fiber: 'Fibra',
        userProfile: 'PERFIL DEL USUARIO',
        allergies: 'Alergias',
        preferences: 'Preferencias dietéticas',
        goals: 'Objetivos de salud',
        instructions: 'INSTRUCCIONES',
        instruction1: 'Determina si el producto es "suitable" (adecuado), "questionable" (cuestionable) o "not-recommended" (no recomendado) para este usuario.',
        instruction2: 'Asigna una puntuación nutricional de 0 a 100 (donde 100 es excelente).',
        instruction3: 'Lista 2-4 beneficios específicos del producto.',
        instruction4: 'Lista 2-4 preocupaciones o problemas específicos.',
        instruction5: 'Escribe una descripción personalizada de 2-3 oraciones explicando por qué es adecuado o no para este usuario.',
        responseFormat: 'Responde ÚNICAMENTE con un objeto JSON válido en este formato exacto'
    },
    EN: {
        role: 'You are a strict expert nutritionist.',
        product: 'PRODUCT',
        name: 'Name',
        brand: 'Brand',
        category: 'Category',
        ingredients: 'Ingredients',
        allergens: 'Allergens',
        none: 'None',
        nutritionInfo: 'Nutritional information (per',
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbohydrates',
        sugar: 'Sugar',
        fat: 'Fat',
        sodium: 'Sodium',
        fiber: 'Fiber',
        userProfile: 'USER PROFILE',
        allergies: 'Allergies',
        preferences: 'Dietary preferences',
        goals: 'Health goals',
        instructions: 'INSTRUCTIONS',
        instruction1: 'Determine if the product is "suitable", "questionable", or "not-recommended" for this user.',
        instruction2: 'Assign a nutrition score from 0 to 100 (where 100 is excellent).',
        instruction3: 'List 2-4 specific benefits of the product.',
        instruction4: 'List 2-4 specific concerns or issues.',
        instruction5: 'Write a personalized description of 2-3 sentences explaining why it is or isn\'t suitable for this user.',
        responseFormat: 'Respond ONLY with a valid JSON object in this exact format'
    }
};

/**
 * Generate AI prompt in the specified language
 */
// Simple in-memory cache to store analysis results
const analysisCache = new Map<string, AIAnalysisResult>();

/**
 * Generate AI prompt in the specified language - Optimized for speed
 */
function generatePrompt(product: any, userProfile: UserProfile, language: Language): string {
    const t = AI_PROMPTS[language];

    // Language-specific prompt templates - Optimized for brevity
    const promptTemplates = {
        ES: {
            analyze: 'Analiza este producto para:',
            criticalInstruction: 'SI contiene alérgenos del usuario: status="not-recommended", score=10. SIN EXCEPCIONES.',
            concise: 'Sé MUY CONCISO. Frases cortas y directas. Sin relleno.'
        },
        EN: {
            analyze: 'Analyze this product for:',
            criticalInstruction: 'IF contains user allergens: status="not-recommended", score=10. NO EXCEPTIONS.',
            concise: 'Be VERY CONCISE. Short, direct sentences. No filler.'
        }
    };

    const template = promptTemplates[language];

    // Safe access to nutrition
    const nutrition = product.nutrition || { servingSize: 'N/A', calories: 0, sugar: 0, sodium: 0, protein: 0, fiber: 0 };

    // Compact prompt to save tokens and processing time
    return `Role: Strict Nutritionist.
Task: ${template.analyze}
User: ${userProfile.allergies.join(',') || 'None'} (Allergies), ${userProfile.goals.join(',') || 'None'} (Goals).

Product: ${product.name} (${product.brand})
Ing: ${product.ingredients?.join(',') || ''}
Nutri: ${nutrition.calories}kcal, Sug:${nutrition.sugar}g, Sod:${nutrition.sodium}mg, Prot:${nutrition.protein}g, Fib:${nutrition.fiber}g.

RULES:
1. ${template.criticalInstruction}
2. ${template.concise}
3. Translate ingredients to ${language === 'ES' ? 'Spanish' : 'English'}.
4. NO Markdown in JSON values.

Response JSON format:
{
  "status": "suitable"|"questionable"|"not-recommended",
  "nutritionScore": 0-100,
  "benefits": ["short benefit 1", "short benefit 2"],
  "issues": ["short issue 1", "short issue 2"],
  "aiDescription": "Very short personalized summary (max 2 sentences).",
  "ingredients": ["translated 1", "translated 2"],
  "allergens": ["translated 1"]
}`;
}

/**
 * Analyze a product using Mistral AI based on user profile and language
 */
export async function analyzeProductWithAI(
    product: any,
    userProfile: UserProfile,
    language: Language = 'ES'
): Promise<AIAnalysisResult> {
    // 1. Check Cache
    const cacheKey = `${product.id}-${language}-${userProfile.allergies.join(',')}`;
    if (analysisCache.has(cacheKey)) {
        console.log('Returning cached analysis for:', product.name);
        return analysisCache.get(cacheKey)!;
    }

    // Fallback mode if no API key
    if (!client) {
        return getFallbackAnalysis(product, userProfile, language);
    }

    try {
        const prompt = generatePrompt(product, userProfile, language);

        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: prompt }],
            maxTokens: 500, // Limit response length for speed
            temperature: 0.1 // Low temperature for consistent, direct answers
        });

        let content = response.choices?.[0]?.message?.content;

        if (!content || typeof content !== 'string') {
            throw new Error('Invalid response format from AI');
        }

        // Clean content
        content = content.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid JSON response from AI');
        }

        const result = JSON.parse(jsonMatch[0]);

        // Validate response
        if (!result.status || !result.nutritionScore) {
            throw new Error('Incomplete AI response');
        }

        // 2. Save to Cache
        analysisCache.set(cacheKey, result);

        return result;
    } catch (error) {
        console.error('Error analyzing product with AI:', error);
        return getFallbackAnalysis(product, userProfile, language);
    }
}

/**
 * Fallback messages in different languages
 */
const FALLBACK_MESSAGES = {
    ES: {
        containsAllergens: 'Contiene alérgenos',
        notRecommendedAllergies: 'No recomendado debido a tus alergias',
        allergenWarning: (allergens: string) => `Este producto contiene ${allergens}, que está en tu lista de alergias. No es seguro para ti consumirlo.`,
        highSugar: (amount: number) => `Alto contenido de azúcar (${amount}g)`,
        lowSugar: 'Bajo en azúcar',
        highSodium: (amount: number) => `Alto contenido de sodio (${amount}mg)`,
        lowSodium: 'Bajo en sodio',
        goodProtein: (amount: number) => `Buena fuente de proteína (${amount}g)`,
        highFiber: (amount: number) => `Alto en fibra (${amount}g)`,
        standardProduct: 'Producto procesado estándar',
        moderateConsumption: 'Consumir con moderación',
        scoreDescription: (score: number, issue: string) =>
            `Este producto tiene una puntuación nutricional de ${score}/100. ${issue ? 'Considera ' + issue.toLowerCase() + '.' : 'Es una opción aceptable.'}`
    },
    EN: {
        containsAllergens: 'Contains allergens',
        notRecommendedAllergies: 'Not recommended due to your allergies',
        allergenWarning: (allergens: string) => `This product contains ${allergens}, which is on your allergy list. It is not safe for you to consume.`,
        highSugar: (amount: number) => `High sugar content (${amount}g)`,
        lowSugar: 'Low in sugar',
        highSodium: (amount: number) => `High sodium content (${amount}mg)`,
        lowSodium: 'Low in sodium',
        goodProtein: (amount: number) => `Good source of protein (${amount}g)`,
        highFiber: (amount: number) => `High in fiber (${amount}g)`,
        standardProduct: 'Standard processed product',
        moderateConsumption: 'Consume in moderation',
        scoreDescription: (score: number, issue: string) =>
            `This product has a nutrition score of ${score}/100. ${issue ? 'Consider ' + issue.toLowerCase() + '.' : 'It is an acceptable option.'}`
    }
};

/**
 * Fallback analysis when AI is not available
 */
function getFallbackAnalysis(product: any, userProfile: UserProfile, language: Language = 'ES'): AIAnalysisResult {
    const msg = FALLBACK_MESSAGES[language];

    // Safe access to nutrition
    const nutrition = product.nutrition || {
        servingSize: 'N/A',
        calories: 0,
        protein: 0,
        carbs: 0,
        sugar: 0,
        fat: 0,
        sodium: 0,
        fiber: 0
    };

    // Check for allergens
    const hasAllergens = product.allergens?.some((allergen: string) =>
        userProfile.allergies.some(userAllergen =>
            allergen.toLowerCase().includes(userAllergen.toLowerCase()) ||
            userAllergen.toLowerCase().includes(allergen.toLowerCase())
        )
    );

    // Translate ingredients and allergens if language is ES
    let translatedIngredients = product.ingredients;
    let translatedAllergens = product.allergens;

    if (language === 'ES') {
        translatedIngredients = product.ingredients?.map((ing: string) => INGREDIENT_TRANSLATIONS[ing] || ing);
        translatedAllergens = product.allergens?.map((all: string) => INGREDIENT_TRANSLATIONS[all] || all);
    }

    if (hasAllergens) {
        return {
            status: 'not-recommended',
            nutritionScore: 10, // Extremely low score for allergens
            benefits: [],
            issues: [
                `${msg.containsAllergens}: ${translatedAllergens?.join(', ')}`,
                msg.notRecommendedAllergies
            ],
            aiDescription: msg.allergenWarning(translatedAllergens?.join(', ')),
            ingredients: translatedIngredients,
            allergens: translatedAllergens
        };
    }

    // Simple scoring based on nutrition
    let score = 50;
    const issues: string[] = [];
    const benefits: string[] = [];

    // Check sugar
    if (nutrition.sugar > 15) {
        score -= 20;
        issues.push(msg.highSugar(nutrition.sugar));
    } else if (nutrition.sugar < 5) {
        score += 10;
        benefits.push(msg.lowSugar);
    }

    // Check sodium
    if (nutrition.sodium > 500) {
        score -= 15;
        issues.push(msg.highSodium(nutrition.sodium));
    } else if (nutrition.sodium < 200) {
        score += 10;
        benefits.push(msg.lowSodium);
    }

    // Check protein
    if (nutrition.protein > 10) {
        score += 15;
        benefits.push(msg.goodProtein(nutrition.protein));
    }

    // Check fiber
    if (nutrition.fiber > 5) {
        score += 10;
        benefits.push(msg.highFiber(nutrition.fiber));
    }

    // Determine status
    let status: 'suitable' | 'questionable' | 'not-recommended';
    if (score >= 70) {
        status = 'suitable';
    } else if (score >= 40) {
        status = 'questionable';
    } else {
        status = 'not-recommended';
    }

    return {
        status,
        nutritionScore: Math.max(0, Math.min(100, score)),
        benefits: benefits.length > 0 ? benefits : [msg.standardProduct],
        issues: issues.length > 0 ? issues : [msg.moderateConsumption],
        aiDescription: msg.scoreDescription(score, issues[0] || ''),
        ingredients: translatedIngredients,
        allergens: translatedAllergens
    };
}
