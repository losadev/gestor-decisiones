import { Router } from "express";
import { createDecision } from "../controllers/decision.controller";

const router = Router();

router.post("/", createDecision);

export default router;
