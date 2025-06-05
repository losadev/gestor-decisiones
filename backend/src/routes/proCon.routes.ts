import { Router } from "express";
import { getAllProsConsById } from "../controllers/prosCons.controller";
const router = Router();

router.get("/:id", getAllProsConsById);

export default router;
