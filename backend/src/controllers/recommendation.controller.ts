import { getRecommendationFromAI } from "../services/openai.service";
import { Evaluation } from "../models/evaluation.model";
import { Decision } from "../models/decision.model";
import { recommendationService } from "../services/recommendation.service";
import { Request, Response } from "express";
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

    // Obtiene las últimas 3 evaluaciones del usuario para esta decisión
    const lastEvaluations = await Evaluation.findAll({
      where: { userId: user.id, decisionId },
      order: [["date", "DESC"]],
      limit: 3,
      include: [Decision],
    });

    if (lastEvaluations.length < 3) {
      res.status(400).json({
        message: "No hay suficientes evaluaciones para generar recomendación",
      });
      return;
    }

    // Mapea los datos necesarios para el prompt
    const decisionsData = await Promise.all(
      lastEvaluations.map(async (evaluation) => {
        const prosCons = await ProCon.findAll({
          where: { decisionId: evaluation.decisionId },
        });

        const pros = prosCons
          .filter((p) => p.type === "Pro")
          .map((p) => p.description);
        const cons = prosCons
          .filter((p) => p.type === "Contra")
          .map((p) => p.description);

        return {
          title: evaluation.decision.title,
          //description: evaluation.decision.description,
          pros,
          cons,
          score: evaluation.score,
        };
      })
    );

    const recommendationData = await getRecommendationFromAI(decisionsData);

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
