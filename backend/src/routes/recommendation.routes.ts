import { Router } from "express";
import {
  createRecommendation,
  getRecommendations,
} from "../controllers/recommendation.controller";

const router = Router();

router.post("/", createRecommendation);
router.get("/", getRecommendations);
export default router;
