import { Request, Response } from "express";
import { decisionService } from "../services/decision.service";
import { v4 as uuidv4 } from "uuid";
import { CategoryType } from "../types/decision.types";

export const createDecision = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;
    const userId = req.user as { id: string };

    // if (!req.user) {
    //   res.status(404).json({ message: "User id not existing" });
    //   return;
    // }

    const decision = await decisionService.create({
      id: uuidv4(),
      title,
      category,
      userId: userId.id,
    });

    res
      .status(201)
      .json({ message: "Decisión creada con éxito", data: decision });
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error en Decision" });
  }
};
