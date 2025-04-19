import { Request, Response } from "express";
import { evaluationService } from "../services/evalutation.service";

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const { result, score, decisionId } = req.body;

    if (!decisionId) {
      res.status(404).json({ message: "No se encuentra la Decisión" });
      return;
    }

    const evaluation = await evaluationService.create({
      result,
      score,
      decisionId,
    });

    res
      .status(201)
      .json({ message: "Evaluación creada con éxito", data: evaluation });
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
