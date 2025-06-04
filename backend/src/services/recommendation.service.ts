import { Recommendation } from "../models/recommendation.model";
import { v4 as uuid4 } from "uuid";

export const recommendationService = {
  create: async (recommendationData: {
    userId: string;
    title: string;
    content: string;
    decisionId: string;
  }) => {
    const recommendation = await Recommendation.create({
      id: uuid4(),
      ...recommendationData,
    });

    return recommendation;
  },
  get: async (decisionId: string) => {
    const recommendation = await Recommendation.findOne({
      where: { decisionId },
    });

    return recommendation;
  },
  getAllByUser: async (userId: string) => {
    return Recommendation.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },
};
