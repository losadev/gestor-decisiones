import { getRecommendationFromAI } from "../services/openai.service";
import { Evaluation } from "../models/evaluation.model";
import { Decision } from "../models/decision.model";

export const getRecommendation = async (
  decision: Decision,
  evaluation: Evaluation
) => {
  try {
    const recommendation = await getRecommendationFromAI(decision, evaluation);
    return recommendation;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "OpenAI API Error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error generating recommendation:", error.message);
    }
    throw new Error("Failed to generate recommendation");
  }
};
