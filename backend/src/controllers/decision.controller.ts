import { Request, Response } from "express";
import { decisionService } from "../services/decision.service";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const decision = await decisionService.create(req.body);
    res
      .status(201)
      .json({ message: "Decisión creada con éxito", data: decision });
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
