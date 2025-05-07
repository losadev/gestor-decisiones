import { Request, Response } from "express";
import { proConService } from "../services/proCon.service";
import { ProConReqBody } from "../types/proCon.type";
import { decisionService } from "../services/decision.service";
import { Decision } from "../models/decision.model";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const userId = req.user as { id: string };

    const decision = await decisionService.create({
      userId: userId.id,
      ...req.body,
    });
    const proConsArray: ProConReqBody[] = req.body.prosCons;

    if (!proConsArray || proConsArray.length === 0) {
      res.status(404).json({ message: "No se encuentran los ProCons" });
      return;
    }

    let prosCons = [];

    for (const proCon of proConsArray) {
      const { description, type, weight } = proCon;
      prosCons.push(
        await proConService.create({
          description,
          type,
          weight,
          decisionId: decision.id,
        })
      );
    }

    res.status(201).json({
      message: "Decisión creada con éxito",
      data: decision,
      prosCons: prosCons,
    });
  } catch (error: any) {
    console.log(req.body.prosCons);
    res
      .status(500)
      .json({ message: "Server Internal Error", error: error.message });
  }
};

export const deleteDecision = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedDecision = await decisionService.delete(id);

    res.status(200).json({ message: deletedDecision.message });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Internal Error", error: error.message });
  }
};

export const getAllDecisions = async (_req: Request, res: Response) => {
  try {
    const decisions = await Decision.findAll();
    res.status(200).json({
      message: "Se han recuperado todas las decisiones",
      decisions,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
