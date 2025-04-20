import OpenAI from "openai";
import { Decision } from "../models/decision.model";
import { Evaluation } from "../models/evaluation.model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getRecommendationFromAI(
  decision: Decision,
  evaluation: Evaluation
) {
  const decisionData = decision.toJSON();
  const evaluationData = evaluation.toJSON();

  const prompt = `
                El usuario ha tomado la siguiente decisión: "${decisionData.title}".
                Evaluación: "${evaluationData.result}". Puntuación: ${evaluationData.score}.

                Basándote en esto, sugiere una recomendación útil para futuras decisiones similares.
                Asegúrate de que la recomendación sea clara y concisa.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 150,
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente que ayuda a mejorar la toma de decisiones personales.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}
