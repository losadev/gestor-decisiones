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
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        success: false,
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const avatarUrl = req.file ? req.file.filename : undefined;

    const updatedData = {
      ...req.body,
      ...(avatarUrl && { avatar: avatarUrl }),
    };

    const updatedUser = await userService.updateUser(userId, updatedData);

    if (!updatedUser) {
      res.status(404).json({
        message: "Usuario no encontrado",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Usuario actualizado con éxito",
      data: updatedUser,
      success: true,
    });
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        success: false,
      });
    }
  }
};
