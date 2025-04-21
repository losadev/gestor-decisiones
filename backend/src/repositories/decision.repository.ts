import { Decision } from "../models/decision.model";
import { ProCon } from "../models/proCon.model";

export const deleteDecisionById = async (id: string) => {
  const decision = await Decision.findOne({
    where: { id },
    include: [ProCon],
  });
  if (!decision) {
    return { message: "La decisión no existe" };
  }
  await decision.destroy();
  return { message: "La decisión ha sido borrada con éxito" };
};
