/**
 * Test script to verify MVP functionality
 * This simulates a barcode scan and AI analysis
 */

import { findProductByBarcode } from './src/services/product-database.service';
import { analyzeProductWithAI } from './src/services/ai-analysis.service';

// Mock user profile
const mockUserProfile = {
    name: 'Test User',
    email: 'test@example.com',
    country: 'Argentina',
    language: 'ES',
    allergies: ['Leche'],
    preferences: ['Vegano', 'Bajo en azúcar'],
    goals: ['Perder peso']
};

async function testBarcodeScanning() {
    console.log('🧪 Starting MVP Test...\n');

    // Test 1: Search for Leche Armonía
    console.log('📊 Test 1: Searching for Leche Armonía (7790742336200)');
    const product1 = findProductByBarcode('7790742336200');

    if (product1) {
        console.log('✅ Product found:', product1.name);
        console.log('   Brand:', product1.brand);
        console.log('   Category:', product1.category);
        console.log('   Allergens:', product1.allergens.join(', '));
    } else {
        console.log('❌ Product NOT found');
        return;
    }

    // Test 2: Analyze with AI in Spanish
    console.log('\n📊 Test 2: Analyzing with AI (Spanish)');
    try {
        const analysis = await analyzeProductWithAI(
            {
                name: product1.name,
                brand: product1.brand,
                category: product1.category,
                ingredients: product1.ingredients,
                allergens: product1.allergens,
                nutrition: {
                    servingSize: '100ml',
                    calories: 49,
                    protein: 3,
                    carbs: 4.7,
                    sugar: 4.7,
                    fat: 2,
                    sodium: 45,
                    fiber: 0
                }
            },
            mockUserProfile,
            'ES'
        );

        console.log('✅ AI Analysis complete:');
        console.log('   Status:', analysis.status);
        console.log('   Score:', analysis.nutritionScore + '/100');
        console.log('   Benefits:', analysis.benefits.join(', '));
        console.log('   Issues:', analysis.issues.join(', '));
        console.log('   Description:', analysis.aiDescription);
    } catch (error) {
        console.log('❌ AI Analysis failed:', error);
    }

    // Test 3: Search for Coca-Cola
    console.log('\n📊 Test 3: Searching for Coca-Cola (7501000111111)');
    const product2 = findProductByBarcode('7501000111111');

    if (product2) {
        console.log('✅ Product found:', product2.name);
    } else {
        console.log('❌ Product NOT found');
        return;
    }

    // Test 4: Analyze Coca-Cola with AI in English
    console.log('\n📊 Test 4: Analyzing with AI (English)');
    try {
        const analysis = await analyzeProductWithAI(
            {
                name: product2.name,
                brand: product2.brand,
                category: product2.category,
                ingredients: product2.ingredients,
                allergens: product2.allergens,
                nutrition: {
                    servingSize: '100ml',
                    calories: 42,
                    protein: 0,
                    carbs: 10.6,
                    sugar: 10.6,
                    fat: 0,
                    sodium: 10,
                    fiber: 0
                }
            },
            mockUserProfile,
            'EN'
        );

        console.log('✅ AI Analysis complete:');
        console.log('   Status:', analysis.status);
        console.log('   Score:', analysis.nutritionScore + '/100');
        console.log('   Benefits:', analysis.benefits.join(', '));
        console.log('   Issues:', analysis.issues.join(', '));
        console.log('   Description:', analysis.aiDescription);
    } catch (error) {
        console.log('❌ AI Analysis failed:', error);
    }

    // Test 5: Test invalid barcode
    console.log('\n📊 Test 5: Testing invalid barcode (1234567890123)');
    const product3 = findProductByBarcode('1234567890123');

    if (product3) {
        console.log('❌ Unexpected: Product found');
    } else {
        console.log('✅ Correctly returned null for invalid barcode');
    }

    console.log('\n🎉 All tests completed!');
}

// Run tests
testBarcodeScanning().catch(console.error);
