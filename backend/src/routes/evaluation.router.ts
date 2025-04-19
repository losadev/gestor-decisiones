import { Router } from "express";
import { createEvaluation } from "../controllers/evalutation.controller";
const router = Router();

router.post("/", createEvaluation);

export default router;
