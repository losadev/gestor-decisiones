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

    const user = (req as any).user as { id: string };

    const existingRecommendation = await recommendationService.get(decisionId);
    // if (existingRecommendation) {
    //   res
    //     .status(200)
    //     .json({ message: "Ya existe una recomendación para esta decisión." });
    //   return;
    // }

    const recentDecisions = await Decision.findAll({
      where: { userId: user.id },
      include: [ProCon],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    if (recentDecisions.length < 3) {
      // res.status(400).json({
      //   message:
      //     "Se necesitan al menos 3 decisiones para generar una recomendación.",
      // });
      return;
    }

    const evaluations = await Evaluation.findAll({
      where: {
        decisionId: recentDecisions.map((d) => d.id),
      },
    });

    const decisionsData = recentDecisions.map((decision) => {
      const pros = decision.proCons
        .filter((pc: any) => pc.type === "Pro")
        .map((pc: any) => pc.text);
      const cons = decision.proCons
        .filter((pc: any) => pc.type === "Contra")
        .map((pc: any) => pc.text);
      const score =
        evaluations.find((e) => e.decisionId === decision.id)?.score ?? 0;

      return {
        title: decision.title,
        pros,
        cons,
        score,
      };
    });

    const recommendation = await getRecommendationFromAI(decisionsData);

    if (!recommendation) {
      res.status(500).json({
        message: "No se pudo generar la recomendación con IA.",
      });
      return;
    }

    const newRecommendation = await recommendationService.create({
      userId: user.id,
      decisionId,
      title: recommendation.title,
      content: recommendation.content,
    });

    res.status(201).json({
      message: "Recomendación creada con éxito",
      recommendation: newRecommendation,
    });
  } catch (error) {
    console.error("Error al generar recomendación:", error);
    res.status(500).json({ message: "Error al generar recomendación" });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: string };

    const recommendations = await recommendationService.getAllByUser(user.id);

    res.status(200).json({
      message: "Recomendaciones recuperadas con éxito",
      recommendations,
    });
  } catch (error) {
    console.error("Error al recuperar recomendaciones:", error);
    res.status(500).json({ message: "Error al recuperar recomendaciones" });
  }
};
