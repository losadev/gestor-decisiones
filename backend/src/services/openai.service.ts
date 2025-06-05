import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getRecommendationFromAI(
  decisionsData: {
    title: string;
    pros: string[];
    cons: string[];
    score: number;
  }[]
) {
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
    
    **Importante: Devuelve SOLO un JSON con este formato:
    
    {
      "title": "Consejo general claro y breve",
      "content": "Explicación concreta, útil y general sobre cómo mejorar la toma de decisiones."
    }
    
    Aquí está el resumen:
    
    ${decisionsSummary}
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 150,
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente experto en ayudar a las personas a mejorar su toma de decisiones.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
  });

  const raw = response.choices[0].message.content;

  try {
    const match = raw?.match(/{[\s\S]*}/);
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
  } catch (e) {
    console.error("Error al parsear la respuesta de OpenAI:", raw);
    console.error("Detalle del error:", e);
    return null;
  }
}
