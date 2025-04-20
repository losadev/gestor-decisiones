import { Recommendation } from "../models/recommendation.model";
import { v4 as uuid4 } from "uuid";

export const recommendationService = {
  create: async (recommendationData: {
    userId: string;
    content: string;
    evaluationId: string;
    decisionId: string;
  }) => {
    const recommendation = await Recommendation.create({
      id: uuid4(),
      ...recommendationData,
    });

    return recommendation;
  },
};
