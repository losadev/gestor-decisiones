// routes/decision.routes.ts
import { Router } from "express";
import {
  createDecision,
  deleteDecision,
  getAllDecisions,
} from "../controllers/decision.controller";

const router = Router();

router.post("/", createDecision);
router.delete("/:id", deleteDecision);
router.get("/", getAllDecisions);

export default router;
