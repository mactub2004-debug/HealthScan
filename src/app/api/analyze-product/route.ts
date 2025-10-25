import { NextResponse } from 'next/server';
// Se elimina la importación estática de MistralClient aquí
import type { Product, User } from '@/lib/types';
import { ALL_PRODUCTS } from '@/lib/data';

interface AnalysisResult {
  score: number;
  rating: string;
  summary: string;
}

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.error("Mistral API key is not set in environment variables.");
}

// Se elimina la instanciación global del cliente aquí

const buildPrompt = (product: Product, user: User): string => {
  const userAllergies = user.allergies.join(', ') || 'none';
  const userDiets = user.diet.join(', ') || 'none';
  const userGoals = user.healthGoals.join(', ') || 'none';

  return `
          You are an expert nutritionist AI. Your task is to analyze a food product based on a user's profile and provide a clear, concise, and helpful analysis. You will output a JSON object with the fields "score", "rating", and "summary".

          The user's profile is as follows:
          - Allergies: ${userAllergies}
          - Diets: ${userDiets}
          - Health Goals: ${userGoals}

          The product to analyze is "${product.name}", with the following ingredients: ${product.ingredients.join(', ')}.

          Based on this information, provide:
          1.  "score": A numerical score from 0 to 100, where 100 is perfectly aligned with the user's profile and 0 is completely misaligned. Consider allergies, dietary restrictions (like vegan, gluten-free), and health goals (like low-sugar, high-protein). A product containing a user's allergen should receive a score of 0.
          2.  "rating": A one-word rating based on the score: "Excellent", "Good", "Average", "Poor", "Avoid".
          3.  "summary": A brief, one or two-sentence summary explaining the score, mentioning the key positive or negative aspects of the product for this specific user.

          Example for a user allergic to nuts analyzing a product with almonds:
          {
            "score": 0,
            "rating": "Avoid",
            "summary": "This product is not suitable as it contains almonds, which is one of your specified allergens."
          }

          Example for a vegan user analyzing a vegan, low-sugar product:
          {
            "score": 95,
            "rating": "Excellent",
            "summary": "This product is an excellent fit for your profile. It aligns with your vegan diet and low-sugar health goals."
          }

          Now, provide the JSON object for the given product and user profile.
        `;
};


function parseAnalysisResult(text: string): AnalysisResult {
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed.score === 'number' &&
        typeof parsed.rating === 'string' &&
        typeof parsed.summary === 'string') {
      return parsed;
    }
    throw new Error("Parsed JSON does not match expected format.");
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    throw new Error("AI response was not in the expected JSON format.");
  }
}

export async function POST(req: Request) {
    if (!apiKey) {
        return NextResponse.json({ error: 'AI service is not configured.' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { productId, user } = body;

        if (!productId || !user) {
            return NextResponse.json({ error: 'Missing productId or user data' }, { status: 400 });
        }

        const product = ALL_PRODUCTS.find(p => p.id === productId);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Importación dinámica CORRECTA
        const MistralAIModule = await import('@mistralai/mistralai');

        // Accede a la exportación por defecto y usa 'as any'
        const MistralClient = MistralAIModule.default as any;

        // Usa la variable MistralClient directamente
        const client = new MistralClient(apiKey);

        const prompt = buildPrompt(product, user as User);

        const chatResponse = await client.chat({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: prompt }],
            responseFormat: { type: 'json_object' }
        });

        const analysisText = chatResponse.choices[0].message.content;

        if (!analysisText) {
            throw new Error("Received empty response from AI.");
        }

        const analysis = parseAnalysisResult(analysisText);

        return NextResponse.json(analysis);

    } catch (error: any) {
        console.error("Error in /api/analyze-product:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
