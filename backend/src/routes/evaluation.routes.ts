import { Router } from "express";
import {
  createEvaluation,
  getAllEvaluations,
  getEvaluationByDecisionId,
} from "../controllers/evaluation.controller";
const router = Router();

router.post("/", createEvaluation);
router.get("/", getAllEvaluations);
router.get("/:decisionId", getEvaluationByDecisionId);

export default router;
