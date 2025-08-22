import { Router } from "express";
import { uploadAvatar } from "../middlewares/upload";
import {
  createUser,
  updatePassword,
  updateUser,
  verifyCurrentPassword,
} from "../controllers/user.controller";
import { editUserSchema, validateZod } from "../middlewares/validationsUser";
import { userSchema } from "../middlewares/validationsUser";

const router = Router();

router.post("/", uploadAvatar, validateZod(userSchema), createUser);
router.put(
  "/:id",
  uploadAvatar,
  validateZod(editUserSchema),
  updateUser
);
router.put("/:id/password", updatePassword);
router.post("/:id/password/verify", verifyCurrentPassword);

export default router;
