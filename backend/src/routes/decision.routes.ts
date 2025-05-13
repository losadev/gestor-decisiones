// routes/decision.routes.ts
import { Router } from "express";
import {
  createDecision,
  deleteDecision,
  getAllDecisions,
  getDecisionById,
} from "../controllers/decision.controller";

const router = Router();

router.post("/", createDecision);
router.delete("/:id", deleteDecision);
router.get("/", getAllDecisions);
router.get("/:id", getDecisionById);

export default router;
