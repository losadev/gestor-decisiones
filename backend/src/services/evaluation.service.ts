import { Evaluation } from "../models/evaluation.model";
import { v4 as uuidv4 } from "uuid";
import { EvaluationCreateInput } from "../@types/evaluation.types";

export const evaluationService = {
  create: async (evaluationData: Omit<EvaluationCreateInput, "date">) => {
    const evaluation = await Evaluation.create({
      id: uuidv4(),
      ...evaluationData,
      date: new Date(),
    });

    return evaluation;
  },
  getAll: async () => {
    const evaluations = await Evaluation.findAll({
      order: [["date", "DESC"]],
    });

    return evaluations;
  },
  getByDecisionId: async (decisionId: string) => {
    const evaluation = await Evaluation.findOne({
      where: { decisionId },
    });

    return evaluation;
  },
};
