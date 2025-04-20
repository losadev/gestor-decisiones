import { Evaluation } from "../models/evaluation.model";
import { v4 as uuidv4 } from "uuid";
import { EvaluationCreateInput } from "../types/evaluation.types";

export const evaluationService = {
  create: async (evaluationData: Omit<EvaluationCreateInput, "date">) => {
    const evaluation = await Evaluation.create({
      id: uuidv4(),
      ...evaluationData,
      date: new Date(),
    });

    return evaluation;
  },
};
