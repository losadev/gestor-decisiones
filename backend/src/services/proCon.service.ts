import { ProCon } from "../models/proCon.model";
import { ProConType } from "../types/proCon.type";
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
};
