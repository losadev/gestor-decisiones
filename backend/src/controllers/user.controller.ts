import { Request, Response } from "express";
import dotenv from "dotenv";
import { userService } from "../services/user.service";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const avatarUrl = req.file ? req.file.filename : "";
    const user = await userService.createUser({
      ...req.body,
      avatar: avatarUrl,
    });
    res
      .status(201)
      .json({ message: "Usuario creado con éxito", data: user, success: true });
  } catch (error: any) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Ha ocurrido un error en el servidor",
          success: false,
        });
    }
  }
};
