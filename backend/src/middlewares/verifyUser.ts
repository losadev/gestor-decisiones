import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const SECRET_ACCESS_TOKEN = process.env.JWT_SECRET;
    const token = req.cookies["access_token"];

    if (!token) {
      res.status(401).json({ message: "No se ha proveído el token" });
      return;
    }

    if (!SECRET_ACCESS_TOKEN) {
      res.status(500).json({ message: "El secreto JWT no está configurado" });
      return;
    }

    const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN) as jwt.JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    const existingUser = await User.findByPk(decoded.id);

    if (!existingUser) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    const { password, ...data } = existingUser.get({ plain: true });
    req.user = data;

    if (req.params.id && req.params.id !== String(data.id)) {
      res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este recurso" });
      return;
    }

    next();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error de autenticación", error: error.message });
  }
};
