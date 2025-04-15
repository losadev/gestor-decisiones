import { Decision } from "../models/decision.model";
import { CategoryType } from "../types/decision.types";

export const decisionService = {
  create: async (decisionData: {
    id: string;
    title: string;
    category: CategoryType;
  }) => {
    const { id, title, category } = decisionData;

    const decision = await Decision.create({
      id,
      title,
      category,
    });
    return decision;
  },
};
