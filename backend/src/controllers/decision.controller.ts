import { Request, Response } from "express";
import { decisionService } from "../services/decision.service";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const { id, title, category } = req.body;

    if (!req.user) {
      res.status(404).json({ message: "User id not existing" });
      return;
    }
    const userId = req.user as { id: string };

    const decision = await decisionService.create({
      id,
      title,
      category,
      userId: userId.id,
    });

    res
      .status(201)
      .json({ message: "Decisión creada con éxito", data: decision });
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
