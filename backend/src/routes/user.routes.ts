import { Router } from "express";
import { body } from "express-validator";
import { validarDatos } from "../middlewares/validationResult";
import { createUser } from "../controllers/user.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.post(
  "/",
  upload.single("avatar"), // esto maneja el archivo
  body("name").isString().notEmpty().isLength({ min: 2, max: 255 }),
  body("lastName").isString().notEmpty().isLength({ min: 2, max: 255 }),
  body("email").isString().notEmpty().isEmail(),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .notEmpty()
    .isLength({ min: 8, max: 64 }),
  body("birthDate").isString().notEmpty(), // vendrá como string tipo 'YYYY-MM-DD'
  validarDatos,
  createUser
);

export default router;
