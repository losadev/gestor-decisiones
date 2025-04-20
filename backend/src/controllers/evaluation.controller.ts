import { Request, Response } from "express";
import { evaluationService } from "../services/evaluation.service";
import { recommendationService } from "../services/recommendation.service";
import { Decision } from "../models/decision.model";
import { getRecommendation } from "./recommendation.controller";

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

    // Recuperar la decision
    const decision = await Decision.findOne({ where: { id: decisionId } });

    if (!decision) {
      res.status(404).json({ message: "No se encuentra la Decisión" });
      return;
    }

    // Generar recomendación
    const recommendationGenerated = await getRecommendation(
      decision,
      evaluation
    );
    if (!recommendationGenerated) {
      res
        .status(404)
        .json({ message: "No se ha podido generar la recomendación" });
      return;
    }
    // Guardar recomendación
    const recommendation = await recommendationService.create({
      userId: decision.userId,
      content: recommendationGenerated,
      evaluationId: evaluation.id,
      decisionId: decision.id,
    });

    if (!recommendation) {
      res
        .status(404)
        .json({ message: "No se ha podido crear la recomendación" });
      return;
    }

    res.status(201).json({
      message: "Evaluación creada con éxito",
      data: evaluation,
      recommendation: recommendation,
    });
  } catch (error: any) {
    console.error("Error al crear la evaluación:", error); // Agregar log para el error
    res.status(500).json({
      message: "Server Internal Error",
      error: error.message || error, // Mostrar el mensaje del error
    });
  }
};
