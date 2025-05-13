import { Request, Response } from "express";
import { ProCon } from "../models/proCon.model";

export const getAllProsConsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const prosCons = await ProCon.findAll({
      where: { decisionId: id },
    });

    if (!prosCons) {
      res
        .status(404)
        .json({ message: "No se han encontrado los pros y contras" });
      return;
    }

    res.status(200).json({
      message: "Se han recuperado todos los pros y contras",
      prosCons,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
