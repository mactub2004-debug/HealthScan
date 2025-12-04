# 🔐 Solución Permanente para API Key de Mistral

## Problema Actual
La API key está hardcodeada en `src/services/ai-analysis.service.ts`:
```typescript
const apiKey = '35CzGfsu0lapN9CyB6rZ1ziTYLfVoY7e'; // HARDCODED TEST
```

**Riesgos:**
- ❌ Si subes el código a GitHub, la key queda expuesta
- ❌ Cualquiera puede robar tu key y usar tu cuota de API
- ❌ No es una práctica profesional

---

## Solución 1: Arreglar Vite .env (Recomendada para Desarrollo)

### Pasos:
1. **Verificar que `.env` existe y tiene el formato correcto:**
   ```bash
   # Archivo: .env (en la raíz del proyecto)
   VITE_MISTRAL_API_KEY=35CzGfsu0lapN9CyB6rZ1ziTYLfVoY7e
   ```
   ⚠️ **SIN espacios** alrededor del `=`
   ⚠️ **SIN comillas** alrededor del valor

2. **Modificar `ai-analysis.service.ts` para leer del .env:**
   ```typescript
   // Línea 6 - CAMBIAR DE:
   const apiKey = '35CzGfsu0lapN9CyB6rZ1ziTYLfVoY7e'; // HARDCODED TEST
   
   // A:
   const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
   
   if (!apiKey) {
     throw new Error('❌ VITE_MISTRAL_API_KEY no está configurada en .env');
   }
   ```

3. **Reiniciar el servidor de Vite COMPLETAMENTE:**
   ```bash
   # Matar todos los procesos de Node
   taskkill /F /IM node.exe
   
   # Borrar caché de Vite
   Remove-Item -Path node_modules/.vite -Recurse -Force
   
   # Iniciar de nuevo
   npm run dev
   ```

4. **Verificar en la consola del navegador:**
   Deberías ver:
   ```
   🔑 API Key loaded: 35CzGfsu0l...
   ```

### Por qué falló antes:
- Vite cachea las variables de entorno en `node_modules/.vite`
- Si cambias `.env` mientras el servidor está corriendo, NO se actualiza
- Necesitas reiniciar el servidor Y borrar la caché

---

## Solución 2: Backend Proxy (Recomendada para Producción)

### Arquitectura:
```
[Frontend (React)] → [Backend (Node.js/Express)] → [Mistral API]
```

### Ventajas:
- ✅ API key NUNCA se expone al cliente
- ✅ Puedes agregar rate limiting
- ✅ Puedes cachear respuestas
- ✅ Puedes monitorear uso

### Implementación Básica:

#### 1. Crear `server/index.js`:
```javascript
const express = require('express');
const { Mistral } = require('@mistralai/mistralai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Mistral({ 
  apiKey: process.env.MISTRAL_API_KEY // Leída del .env del servidor
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { product, userProfile, language } = req.body;
    
    // Generar prompt (misma lógica que en el frontend)
    const prompt = generatePrompt(product, userProfile, language);
    
    const response = await client.chat.complete({
      model: 'mistral-tiny',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 500,
      temperature: 0.2
    });
    
    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy running on :3001'));
```

#### 2. Modificar `ai-analysis.service.ts`:
```typescript
export async function analyzeProductWithAI(product, userProfile, language) {
  const response = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, userProfile, language })
  });
  
  const data = await response.json();
  return JSON.parse(data.result);
}
```

---

## Solución 3: Mantener Hardcodeada (Solo para Desarrollo Local)

### Cuándo es aceptable:
- ✅ Estás desarrollando localmente
- ✅ NO vas a subir el código a GitHub
- ✅ Es un prototipo/MVP rápido

### Precauciones:
1. **Agregar a `.gitignore`:**
   ```
   # .gitignore
   src/services/ai-analysis.service.ts
   ```
   ⚠️ Esto evitará que se suba, pero también evitará que recibas actualizaciones

2. **Crear una versión "template":**
   ```typescript
   // ai-analysis.service.template.ts
   const apiKey = 'YOUR_API_KEY_HERE';
   ```
   Subir el template y mantener el real solo local.

---

## 🎯 Recomendación Final

**Para desarrollo actual:**
- Usa **Solución 1** (arreglar .env de Vite)
- Es la más rápida y funciona bien para desarrollo

**Para producción/deploy:**
- Usa **Solución 2** (backend proxy)
- Es la única forma segura de manejar API keys en producción

**Nunca:**
- ❌ Subir código con API key hardcodeada a GitHub público
- ❌ Deployar a producción con la key en el frontend

---

## 📝 Checklist de Seguridad

Antes de hacer commit/push:
- [ ] `.env` está en `.gitignore`
- [ ] No hay API keys hardcodeadas en el código
- [ ] `.env.example` tiene placeholders, no valores reales
- [ ] Si usas backend proxy, el `.env` del servidor también está protegido

---

**Última actualización:** 2025-12-04
**Estado:** Documentación completa
