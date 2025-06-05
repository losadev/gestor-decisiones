import { Request, Response } from "express";
import dotenv from "dotenv";
import { userService } from "../services/user.service";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

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
      if (error.message.includes("correo")) {
        res.status(409).json({
          message: error.message,
          success: false,
        });
        return;
      }
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

export const updatePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Contraseña actual incorrecta" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

export const verifyCurrentPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Contraseña incorrecta" });
      return;
    }

    res.json({ message: "Contraseña correcta" });
  } catch (err) {
    res.status(500).json({ message: "Error al verificar la contraseña" });
  }
};
