import { Request, Response } from "express";
import { evaluationService } from "../services/evaluation.service";

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const { result, score, decisionId } = req.body;
    const user = (req as any).user as { id: string };

    if (!decisionId) {
      res
        .status(404)
        .json({ message: "No se encuentra la Decisión", success: false });
      return;
    }

    const evaluation = await evaluationService.create({
      result,
      score,
      decisionId,
      userId: user.id,
    });

    res.status(201).json({
      message: "Evaluación creada con éxito",
      data: evaluation,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      success: false,
    });
  }
};

export const getAllEvaluations = async (_req: Request, res: Response) => {
  try {
    const evaluations = await evaluationService.getAll();
    res.status(200).json({
      message: "Evaluaciones obtenidas con éxito",
      data: evaluations,
      success: true,
    });
  } catch (error: any) {
    console.error("Error al obtener las evaluaciones:", error);
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      success: false,
    });
  }
};

export const getEvaluationByDecisionId = async (
  req: Request,
  res: Response
) => {
  try {
    const { decisionId } = req.params;

    if (!decisionId) {
      res
        .status(400)
        .json({ message: "Falta el ID de la decisión", success: false });
      return;
    }

    const evaluation = await evaluationService.getByDecisionId(decisionId);

    if (!evaluation) {
      res.status(404).json({
        message: "Evaluación no encontrada para esta decisión",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Evaluación obtenida con éxito",
      data: evaluation,
    });
  } catch (error: any) {
    console.error("Error al obtener la evaluación:", error);
    res.status(500).json({
      message: "Server Internal Error",
      error: error.message || error,
    });
  }
};
