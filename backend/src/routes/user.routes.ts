import { Router } from "express";
import { upload } from "../middlewares/upload";
import {
  createUser,
  updatePassword,
  updateUser,
  verifyCurrentPassword,
} from "../controllers/user.controller";
import { editUserSchema, validateZod } from "../middlewares/validationsUser";
import { userSchema } from "../middlewares/validationsUser";

const router = Router();

router.post("/", upload.single("avatar"), validateZod(userSchema), createUser);
router.put(
  "/:id",
  upload.single("avatar"),
  validateZod(editUserSchema),
  updateUser
);
router.put("/:id/password", updatePassword);
router.post("/:id/password/verify", verifyCurrentPassword);

export default router;
