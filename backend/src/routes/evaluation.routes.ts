import { Router } from "express";
import { createEvaluation } from "../controllers/evaluation.controller";
const router = Router();

router.post("/", createEvaluation);

export default router;
