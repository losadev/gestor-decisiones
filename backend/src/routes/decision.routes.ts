// routes/decision.routes.ts
import { Router } from "express";
import {
  createDecision,
  deleteDecision,
} from "../controllers/decision.controller";

const router = Router();

router.post("/", createDecision);
router.delete("/:id", deleteDecision);

export default router;
