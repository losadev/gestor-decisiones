import { Decision } from "../models/decision.model";
import { CategoryType } from "../types/decision.types";
import { v4 as uuidv4 } from "uuid";

export const decisionService = {
  create: async (decisionData: {
    id: string;
    title: string;
    category: CategoryType;
    userId: string;
  }) => {
    const { title, category, userId } = decisionData;

    const decision = await Decision.create({
      id: uuidv4(),
      title,
      category,
      userId,
    });

    return decision;
  },
};
