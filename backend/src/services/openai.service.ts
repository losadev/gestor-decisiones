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
Eres un asistente experto en mejorar la toma de decisiones.

El usuario ha tomado estas últimas 3 decisiones con sus pros, contras y evaluaciones:

${decisionsSummary}

Analiza estas decisiones y evaluaciones, detecta patrones o aprendizajes importantes.

Con base en eso, sugiere una recomendación breve y práctica que ayude al usuario a mejorar sus decisiones futuras.

Devuelve solo un JSON con las claves "title" y "content". Ejemplo:
{
  "title": "Recomendación clara y breve",
  "content": "Explicación útil para aplicar en decisiones futuras."
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 250,
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
