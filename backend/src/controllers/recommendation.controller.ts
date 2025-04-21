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
      res.status(400).json({ message: "No se h encontrado la Decision" });
      return;
    }

    // Primero busco si existe una recomendación para la decisión y la recupero de la base de datos
    const existingRecommendation = await recommendationService.get(decisionId);

    if (existingRecommendation) {
      res.status(200).json({
        message: "Recomendación ya existe",
        data: existingRecommendation,
      });
      return;
    } else {
      // Si no existe, genero una nueva recomendación

      const decision = await Decision.findByPk(decisionId);
      //const prosCons = await ProCon.findAll({ where: { id: decisionId } });
      const prosCons = await ProCon.findAll({ where: { decisionId } });
      if (!decision || prosCons.length === 0) {
        res
          .status(404)
          .json({ message: "Decisión o pro/contra no encontrada" });
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

      const user = req.user as { id: string };

      const recommendation = await recommendationService.create({
        userId: user.id,
        ...recommendationData,
        decisionId,
      });

      res.status(201).json({
        message: "Recomendación creada con éxito",
        data: recommendation,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear la recomendación",
      error: error.message || error,
    });
  }
};
