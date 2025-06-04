import { ProCon } from "../models/proCon.model";
import { ProConType } from "../@types/proCon.type";
import { v4 as uuidv4 } from "uuid";

export const proConService = {
  create: async (proConData: {
    description: string;
    type: ProConType;
    weight: number;
    decisionId: string;
  }) => {
    const { description, type, weight, decisionId } = proConData;

    const proCon = await ProCon.create({
      id: uuidv4(),
      description,
      type,
      weight,
      decisionId,
    });

    return proCon;
  },
  update: async (
    proConId: string,
    updateData: {
      description?: string;
      type?: ProConType;
      weight?: number;
    }
  ) => {
    const proCon = await ProCon.findOne({ where: { id: proConId } });
    if (!proCon) {
      throw new Error("El pro/con no existe");
    }

    await proCon.update(updateData);
    return proCon;
  },

  deleteById: async (proConId: string) => {
    const proCon = await ProCon.findOne({ where: { id: proConId } });
    if (!proCon) {
      throw new Error("El pro/con no existe");
    }

    await proCon.destroy();
    return true;
  },

  getByDecisionId: async (decisionId: string) => {
    const proCons = await ProCon.findAll({ where: { decisionId } });
    return proCons;
  },
  deleteAllByDecisionId: async (decisionId: string) => {
    await ProCon.destroy({
      where: { decisionId },
    });
  },
};
