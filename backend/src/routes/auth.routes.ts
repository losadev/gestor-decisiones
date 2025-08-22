import { Request, Response } from "express";
import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  body("password").not().isEmpty(),
  validateRequest,
  login
);

export default router;
