import { Mistral } from '@mistralai/mistralai';

const apiKey = '35CzGfsu0lapN9CyB6rZ1ziTYLfVoY7e';

console.log('🔑 Testing API Key:', apiKey);

const client = new Mistral({ apiKey });

async function test() {
    try {
        console.log('📡 Listing models...');
        const models = await client.models.list();
        console.log('✅ Success! Available models:');
        models.data.forEach(m => console.log(' - ' + m.id));

        console.log('\n🧪 Testing chat completion with mistral-tiny...');
        const chat = await client.chat.complete({
            model: 'mistral-tiny',
            messages: [{ role: 'user', content: 'Hello' }]
        });
        console.log('✅ Chat response:', chat.choices[0].message.content);
    } catch (error) {
        console.error('❌ Error:', error);
        if (error.statusCode) console.error('Status:', error.statusCode);
        if (error.body) console.error('Body:', error.body);
    }
}

test();
