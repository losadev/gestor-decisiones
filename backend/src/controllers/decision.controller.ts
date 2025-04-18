import { Request, Response } from "express";
import { proConService } from "../services/proCon.service";
import { ProConReqBody } from "../types/proCon.type";
import { decisionService } from "../services/decision.service";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const userId = req.user as { id: string };

    const decision = await decisionService.create({
      userId: userId.id,
      ...req.body,
    });

    if (!req.body.prosCons) {
      res.status(404).json({ message: "No se encuentran los ProCons" });
      return;
    }

    const proConsArray: ProConReqBody[] = req.body.prosCons;

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
  } catch (error) {
    console.log(req.body.prosCons);
    res.status(500).json({ message: "Server Internal Error" });
  }
};
