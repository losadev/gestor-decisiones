import { Router } from "express";
import {
  createEvaluation,
  getAllEvaluations,
} from "../controllers/evaluation.controller";
const router = Router();

router.post("/", createEvaluation);
router.get("/", getAllEvaluations);

export default router;
