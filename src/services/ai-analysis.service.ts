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
}

/**
 * AI Prompts in different languages
 */
const AI_PROMPTS = {
    ES: {
        role: 'Eres un experto nutricionista.',
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
        role: 'You are an expert nutritionist.',
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
    },
    PT: {
        role: 'Você é um nutricionista especialista.',
        product: 'PRODUTO',
        name: 'Nome',
        brand: 'Marca',
        category: 'Categoria',
        ingredients: 'Ingredientes',
        allergens: 'Alérgenos',
        none: 'Nenhum',
        nutritionInfo: 'Informação nutricional (por',
        calories: 'Calorias',
        protein: 'Proteínas',
        carbs: 'Carboidratos',
        sugar: 'Açúcares',
        fat: 'Gorduras',
        sodium: 'Sódio',
        fiber: 'Fibra',
        userProfile: 'PERFIL DO USUÁRIO',
        allergies: 'Alergias',
        preferences: 'Preferências dietéticas',
        goals: 'Objetivos de saúde',
        instructions: 'INSTRUÇÕES',
        instruction1: 'Determine se o produto é "suitable" (adequado), "questionable" (questionável) ou "not-recommended" (não recomendado) para este usuário.',
        instruction2: 'Atribua uma pontuação nutricional de 0 a 100 (onde 100 é excelente).',
        instruction3: 'Liste 2-4 benefícios específicos do produto.',
        instruction4: 'Liste 2-4 preocupações ou problemas específicos.',
        instruction5: 'Escreva uma descrição personalizada de 2-3 frases explicando por que é ou não adequado para este usuário.',
        responseFormat: 'Responda APENAS com um objeto JSON válido neste formato exato'
    }
};

/**
 * Generate AI prompt in the specified language
 */
function generatePrompt(product: any, userProfile: UserProfile, language: Language): string {
    const t = AI_PROMPTS[language];

    return `${t.role} Analiza este producto alimenticio para un usuario con el siguiente perfil:

${t.product}:
- ${t.name}: ${product.name}
- ${t.brand}: ${product.brand}
- ${t.category}: ${product.category}
- ${t.ingredients}: ${product.ingredients.join(', ')}
- ${t.allergens}: ${product.allergens.join(', ') || t.none}
- ${t.nutritionInfo} ${product.nutrition.servingSize}):
  * ${t.calories}: ${product.nutrition.calories} kcal
  * ${t.protein}: ${product.nutrition.protein}g
  * ${t.carbs}: ${product.nutrition.carbs}g
  * ${t.sugar}: ${product.nutrition.sugar}g
  * ${t.fat}: ${product.nutrition.fat}g
  * ${t.sodium}: ${product.nutrition.sodium}mg
  * ${t.fiber}: ${product.nutrition.fiber}g

${t.userProfile}:
- ${t.allergies}: ${userProfile.allergies.join(', ') || t.none}
- ${t.preferences}: ${userProfile.preferences.join(', ') || t.none}
- ${t.goals}: ${userProfile.goals.join(', ') || t.none}

${t.instructions}:
1. ${t.instruction1}
2. ${t.instruction2}
3. ${t.instruction3}
4. ${t.instruction4}
5. ${t.instruction5}

${t.responseFormat}:
{
  "status": "suitable" | "questionable" | "not-recommended",
  "nutritionScore": número entre 0-100,
  "benefits": ["beneficio 1", "beneficio 2", ...],
  "issues": ["problema 1", "problema 2", ...],
  "aiDescription": "descripción personalizada aquí"
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
    // Fallback mode if no API key
    if (!client) {
        return getFallbackAnalysis(product, userProfile, language);
    }

    try {
        const prompt = generatePrompt(product, userProfile, language);

        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: prompt }]
        });

        const content = response.choices?.[0]?.message?.content || '';

        // Extract JSON from response (in case there's extra text)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid JSON response from AI');
        }

        const result = JSON.parse(jsonMatch[0]);

        // Validate response
        if (!result.status || !result.nutritionScore || !result.benefits || !result.issues || !result.aiDescription) {
            throw new Error('Incomplete AI response');
        }

        return result;
    } catch (error) {
        console.error('Error analyzing product with AI:', error);
        // Return fallback analysis on error
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
    },
    PT: {
        containsAllergens: 'Contém alérgenos',
        notRecommendedAllergies: 'Não recomendado devido às suas alergias',
        allergenWarning: (allergens: string) => `Este produto contém ${allergens}, que está na sua lista de alergias. Não é seguro para você consumir.`,
        highSugar: (amount: number) => `Alto teor de açúcar (${amount}g)`,
        lowSugar: 'Baixo em açúcar',
        highSodium: (amount: number) => `Alto teor de sódio (${amount}mg)`,
        lowSodium: 'Baixo em sódio',
        goodProtein: (amount: number) => `Boa fonte de proteína (${amount}g)`,
        highFiber: (amount: number) => `Alto em fibra (${amount}g)`,
        standardProduct: 'Produto processado padrão',
        moderateConsumption: 'Consumir com moderação',
        scoreDescription: (score: number, issue: string) =>
            `Este produto tem uma pontuação nutricional de ${score}/100. ${issue ? 'Considere ' + issue.toLowerCase() + '.' : 'É uma opção aceitável.'}`
    }
};

/**
 * Fallback analysis when AI is not available
 */
function getFallbackAnalysis(product: any, userProfile: UserProfile, language: Language = 'ES'): AIAnalysisResult {
    const msg = FALLBACK_MESSAGES[language];

    // Check for allergens
    const hasAllergens = product.allergens.some((allergen: string) =>
        userProfile.allergies.some(userAllergen =>
            allergen.toLowerCase().includes(userAllergen.toLowerCase()) ||
            userAllergen.toLowerCase().includes(allergen.toLowerCase())
        )
    );

    if (hasAllergens) {
        return {
            status: 'not-recommended',
            nutritionScore: 20,
            benefits: [],
            issues: [
                `${msg.containsAllergens}: ${product.allergens.join(', ')}`,
                msg.notRecommendedAllergies
            ],
            aiDescription: msg.allergenWarning(product.allergens.join(', '))
        };
    }

    // Simple scoring based on nutrition
    let score = 50;
    const issues: string[] = [];
    const benefits: string[] = [];

    // Check sugar
    if (product.nutrition.sugar > 15) {
        score -= 20;
        issues.push(msg.highSugar(product.nutrition.sugar));
    } else if (product.nutrition.sugar < 5) {
        score += 10;
        benefits.push(msg.lowSugar);
    }

    // Check sodium
    if (product.nutrition.sodium > 500) {
        score -= 15;
        issues.push(msg.highSodium(product.nutrition.sodium));
    } else if (product.nutrition.sodium < 200) {
        score += 10;
        benefits.push(msg.lowSodium);
    }

    // Check protein
    if (product.nutrition.protein > 10) {
        score += 15;
        benefits.push(msg.goodProtein(product.nutrition.protein));
    }

    // Check fiber
    if (product.nutrition.fiber > 5) {
        score += 10;
        benefits.push(msg.highFiber(product.nutrition.fiber));
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
        aiDescription: msg.scoreDescription(score, issues[0] || '')
    };
}
