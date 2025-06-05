import { Request, Response } from "express";
import { proConService } from "../services/proCon.service";
import { ProConReqBody } from "../@types/proCon.type";
import { decisionService } from "../services/decision.service";
import { Decision } from "../models/decision.model";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user as { id: string };

    const decision = await decisionService.create({
      userId: userId.id,
      ...req.body,
    });
    const proConsArray: ProConReqBody[] = req.body.prosCons;

    if (!proConsArray || proConsArray.length === 0) {
      res.status(404).json({
        message: "No se encuentran los y pros y contras",
        success: false,
      });
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
      success: true,
    });
  } catch (error: any) {
    console.log(req.body.prosCons);
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      success: false,
    });
  }
};

export const deleteDecision = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedDecision = await decisionService.delete(id);

    res.status(200).json({ message: deletedDecision.message, success: true });
  } catch (error: any) {
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      success: false,
    });
  }
};

export const getAllDecisions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const decisions = await Decision.findAll({ where: { userId } });
    res.status(200).json({
      message: "Se han recuperado las decisiones del usuario",
      success: true,
      decisions,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error en el servidor", success: false });
  }
};

export const getDecisionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const decision = await decisionService.getById(id);

    if (!decision) {
      res
        .status(404)
        .json({ message: "No se ha encontrado la decisión", success: false });
      return;
    }

    res.status(200).json({
      message: "Se ha recuperado la decisión",
      decision,
      success: true,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error en el servidor", success: false });
  }
};

export const updateDecision = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user as { id: string };
    const decisionId = req.params.id;

    // verifica que la decisión existe y pertenece al usuario
    const existingDecision = await decisionService.getById(decisionId);

    if (!existingDecision || existingDecision.userId !== userId.id) {
      res
        .status(404)
        .json({ message: "Decisión no encontrada", success: false });
      return;
    }

    const updatedDecision = await decisionService.update(decisionId, {
      ...req.body,
    });

    // elimina pros y contras actuales
    await proConService.deleteAllByDecisionId(decisionId);

    // crea los nuevos pros y contras
    const proConsArray: ProConReqBody[] = req.body.prosCons;

    if (!proConsArray || proConsArray.length === 0) {
      res
        .status(400)
        .json({ message: "Debe incluir al menos un Pro/Con", success: false });
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
          decisionId,
        })
      );
    }

    res.status(200).json({
      message: "Decisión actualizada con éxito",
      data: updatedDecision,
      success: true,
      prosCons,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      error: error.message,
    });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user as { id: string };

    const decision = await decisionService.getById(id);

    if (!decision || decision.userId !== userId.id) {
      res
        .status(404)
        .json({ message: "Decisión no encontrada", success: false });
      return;
    }

    const updatedDecision = await decisionService.update(id, {
      status: "evaluated",
    });

    res.status(200).json({
      message: "La decisión ha sido evaluada",
      data: updatedDecision,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      success: false,
    });
  }
};
