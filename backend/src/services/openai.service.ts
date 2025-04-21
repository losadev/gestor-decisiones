import OpenAI from "openai";
import { Decision } from "../models/decision.model";
import { Evaluation } from "../models/evaluation.model";
import { ProCon } from "../models/proCon.model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getRecommendationFromAI(
  decision: Decision,
  proCon: ProCon[]
) {
  const decisionData = decision.toJSON();
  const proConData = proCon[0].toJSON();

  const prompt = `
Vas a tomar la decisión: "${decisionData.title}", y estos son los pros/contras de tomar esta decision "${proConData}"

Queremos ayudarte a mejorar tu proceso de toma de decisiones en el futuro.

1. Considera el tipo de decisión que tomaste.
2. Analiza posibles pros y contras de ese tipo de decisiones.
3. Sugiérenos un título breve y un contenido claro y útil que podamos guardar como recomendación para decisiones futuras similares.

Devuelve la respuesta en formato JSON con las siguientes claves: "title" y "content". Ejemplo:
{
  "title": "Analiza antes de decidir",
  "content": "Cuando tomes decisiones sobre comprar un coche eléctrico, considera investigar autonomía, disponibilidad de cargadores, mantenimiento y beneficios fiscales. Evita decisiones impulsivas sin comparar opciones."
}
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
    // Extrae solo el JSON del texto completo
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
