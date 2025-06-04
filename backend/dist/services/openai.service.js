"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendationFromAI = getRecommendationFromAI;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function getRecommendationFromAI(decisionsData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construir resumen con las 3 decisiones:
        const decisionsSummary = decisionsData
            .map((d, i) => {
            return `Decisión ${i + 1}: "${d.title}"
Pros: ${d.pros.join(", ")}
Contras: ${d.cons.join(", ")}
Evaluación final (puntuación): ${d.score}
`;
        })
            .join("\n");
        const prompt = `
    Eres un coach experto en ayudar a personas a tomar mejores decisiones.
    
    Te compartiré un resumen de 3 decisiones recientes que incluyen título, pros, contras y puntuación. Tu objetivo es identificar patrones de comportamiento en la toma de decisiones (como impulsividad, indecisión, precipitación, etc.) y dar una recomendación general para mejorar la toma de decisiones en el futuro.
    
    Devuelve SOLO un JSON con este formato:
    
    {
      "title": "Consejo general claro y breve",
      "content": "Explicación concreta, útil y general sobre cómo mejorar la toma de decisiones."
    }
    
    Aquí está el resumen:
    
    ${decisionsSummary}
    `;
        const response = yield openai.chat.completions.create({
            model: "gpt-4",
            max_tokens: 150,
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente experto en ayudar a las personas a mejorar su toma de decisiones.",
                },
                { role: "user", content: prompt },
            ],
            temperature: 0.5,
        });
        const raw = response.choices[0].message.content;
        try {
            const match = raw === null || raw === void 0 ? void 0 : raw.match(/{[\s\S]*}/);
            if (!match) {
                console.error("No se encontró JSON válido en la respuesta:", raw);
                return null;
            }
            const parsed = JSON.parse(match[0]);
            if (!parsed.title || !parsed.content) {
                console.error("El JSON no contiene las claves esperadas:", parsed);
                return null;
            }
            return {
                title: parsed.title,
                content: parsed.content,
            };
        }
        catch (e) {
            console.error("Error al parsear la respuesta de OpenAI:", raw);
            console.error("Detalle del error:", e);
            return null;
        }
    });
}
