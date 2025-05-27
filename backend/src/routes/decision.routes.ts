// routes/decision.routes.ts
import { Router } from "express";
import {
  createDecision,
  deleteDecision,
  getAllDecisions,
  getDecisionById,
  updateDecision,
  updateState,
} from "../controllers/decision.controller";

const router = Router();

router.post("/", createDecision);
router.delete("/:id", deleteDecision);
router.get("/", getAllDecisions);
router.get("/:id", getDecisionById);
router.put("/:id", updateDecision);
router.patch("/:id", updateState);

export default router;
