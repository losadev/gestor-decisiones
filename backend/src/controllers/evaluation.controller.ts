import { Request, Response } from "express";
import { evaluationService } from "../services/evaluation.service";
import { recommendationService } from "../services/recommendation.service";
import { getRecommendationFromAI } from "../services/openai.service";
import { Evaluation } from "../models/evaluation.model";
import { Decision } from "../models/decision.model";
import { ProCon } from "../models/proCon.model";

export const createRecommendation = async (req: Request, res: Response) => {
  try {
    const { decisionId } = req.body;

    if (!decisionId) {
      res.status(400).json({ message: "No se encontró la Decision" });
      return;
    }

    const user = req.user as { id: string };

    // Verifica si ya hay una recomendación
    const existingRecommendation = await recommendationService.get(decisionId);
    if (existingRecommendation) {
      res.status(200).json({
        message: "Recomendación ya existe",
        data: existingRecommendation,
      });
      return;
    }

    // Cuenta las evaluaciones del usuario para esa decisión
    const evaluationCount = await Evaluation.count({
      where: { decisionId, userId: user.id },
    });

    // Solo continúa si es múltiplo de 3
    if (evaluationCount === 0 || evaluationCount % 3 !== 0) {
      res.status(200).json({
        message: `No se genera recomendación aún. Total evaluaciones: ${evaluationCount}`,
      });
      return;
    }

    const decision = await Decision.findByPk(decisionId);
    const prosCons = await ProCon.findAll({ where: { decisionId } });

    if (!decision || prosCons.length === 0) {
      res
        .status(404)
        .json({ message: "Decisión o pros/contras no encontrada" });
      return;
    }

    const recommendationData = await getRecommendationFromAI(
      decision,
      prosCons
    );

    if (!recommendationData) {
      res.status(500).json({ message: "Error al obtener la recomendación" });
      return;
    }

    const recommendation = await recommendationService.create({
      userId: user.id,
      ...recommendationData,
      decisionId,
    });

    res.status(201).json({
      message: "Recomendación creada con éxito",
      data: recommendation,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear la recomendación",
      error: error.message || error,
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
